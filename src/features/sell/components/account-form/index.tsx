import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState } from "react";
import ImageUploads, { ImageSlot } from "./image-upload";

import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import {
  accountTypes,
  accountTypesNamed,
  gameAccountTypesLists,
  socialsAccountTypesLists,
} from "@/config";
import { Account } from "@/mongoose/models/account";
import axios from "axios";
import { update_account } from "../../actions";
import { useUserAccountsStore } from "../../store";

interface Props {
  account?: Account | undefined;
}

const AccountForm = ({ account }: Props) => {
  const formType = useMemo(() => (account ? "edit" : "create"), [account]);
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState<boolean>(false);
  const { accounts, setAccounts } = useUserAccountsStore.getState();

  const [title, setTitle] = useState<string>(account?.title || "");
  const [description, setDescription] = useState<string>(
    account?.description || ""
  );
  const [level, setLevel] = useState<string>(
    account?.level ? String(account.level) : ""
  );
  const [pid, setPid] = useState<string>(
    account?.pid ? String(account.pid) : ""
  );
  const [price, setPrice] = useState<string>(
    account?.price ? String(account.price) : ""
  );
  const [followers, setFollowers] = useState<string>(
    account?.followers ? String(account.followers) : ""
  );
  const [link, setLink] = useState<string>(account?.link || "");
  const [accountType, setAccountType] = useState<accountTypes>(
    account?.type || "tiktok"
  );

  // images
  const [images, setImages] = useState<ImageSlot[]>([
    {
      id: "main",
      file: null,
      preview: account?.images[0] || "",
      label: "Main Image",
    },
    {
      id: "optional-1",
      file: null,
      preview: account?.images[1] || "",
      label: "Optional",
    },
    {
      id: "optional-2",
      file: null,
      preview: account?.images[2] || "",
      label: "Optional",
    },
  ]);

  const handleImagesUpload = async () => {
    const toUploadImages = images.filter(
      (slot) => slot.file !== null || slot.preview !== ""
    );
    const imageUrls: string[] = [];

    if (toUploadImages.length <= 0) {
      return { error: "You have to upload atleast on image!" };
    }

    for (const slot of toUploadImages) {
      if (slot.file !== null) {
        console.log(slot.id, "new file");
        const file = slot.file;

        const { data } = await axios.get(
          `/api/upload/images?filename=${file.name}`
        );

        const uploadUrl = data.uploadUrl;
        const imageUrl = data.imageUrl;

        await axios.put(uploadUrl, file, {
          headers: { "Content-Type": file.type },
        });

        imageUrls.push(imageUrl);
      } else {
        console.log(slot.id, "just url");
        imageUrls.push(slot.preview);
      }
    }

    return { imageUrls };
  };

  const handleSubmit = () => {
    setError(undefined);
    setSuccess(undefined);

    if (!title || !description || !price) {
      setError("Please fill all the fields!");
      return;
    }

    if (formType == "edit") {
      if (
        title === account?.title &&
        description === account?.description &&
        Number(price) === account?.price &&
        Number(level) === account.level &&
        link === account?.link
      ) {
        setError("You haven't made any changes!");
        return;
      }
    }

    const isValidUrl = (urlString: string) => {
      try {
        new URL(urlString);
        return true;
      } catch {
        return false;
      }
    };

    if (socialsAccountTypesLists.includes(accountType) && !isValidUrl(link)) {
      setError("Please provide a valid link!");
      return;
    }

    setLoading(true);
    handleImagesUpload()
      .then((uploadRes) => {
        if (uploadRes.error) {
          setError(uploadRes.error);
        } else {
          const imageUrls = uploadRes.imageUrls!;
          return update_account(
            {
              type: accountType,
              title,
              description,
              price,
              level,
              link,
              imageUrls,
              followers,
              pid,
            },
            account ? String(account?._id) : undefined
          );
        }
      })
      .then((data) => {
        if (data) {
          setError(data?.error);
          setSuccess(data.success);

          if (data.success && data.data) {
            const accountData = data.data!;
            setDone(true);
            // make it just update the ui
            if (formType === "edit" && accounts) {
              setAccounts(
                accounts.map((accountItem) =>
                  accountItem._id === accountData._id
                    ? accountData
                    : accountItem
                )
              );
            } else {
              setAccounts([...(accounts ? accounts : []), accountData]);
            }
          }
        }
      })
      .catch(() => setError("Something went wrong, Try again!"))
      .finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col overflow-y-scroll md:flex-row max-h-[75vh] p-6 flex-1 gap-8 items-center justify-evenly"
    >
      <ImageUploads images={images} setImages={setImages} />
      <div className="flex flex-col lg:min-w-[22rem] gap-2">
        <div className="flex flex-col">
          <label htmlFor="accountType" className="font-light text-sm">
            Account Type
          </label>
          <Select
            disabled={account?.type ? true : false}
            value={accountType}
            onValueChange={(e) => setAccountType(e as accountTypes)}
          >
            <SelectTrigger id="payment-method">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {accountTypesNamed.map((type) => (
                <SelectItem
                  key={type.id}
                  value={type.id}
                  className="flex items-center gap-2"
                >
                  <div className="flex items-center gap-2">{type.name}</div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-light text-sm">
            Title
          </label>
          <Input
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="16K followers account"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="desc" className="font-light text-sm">
            Description
          </label>
          <Textarea
            id="desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="It has 1000K followers, etc."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="font-light text-sm">
            Price
          </label>
          <div className="flex">
            <span className="h-10 border border-border/25 rounded-l-md px-2 flex items-center justify-center opacity-50">
              ETB
            </span>

            <Input
              id="price"
              required
              value={price}
              type="number"
              className="h-10 rounded-l-none"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="8999"
            />
          </div>
        </div>

        {gameAccountTypesLists.includes(accountType) && (
          <div className="flex flex-col">
            <label htmlFor="level" className="font-light text-sm">
              Level
            </label>
            <Input
              id="level"
              value={level}
              type="number"
              required
              onChange={(e) => setLevel(e.target.value)}
              placeholder="63"
            />
          </div>
        )}
        {gameAccountTypesLists.includes(accountType) && (
          <div className="flex flex-col">
            <label htmlFor="pid" className="font-light text-sm">
              Pid
            </label>
            <Input
              id="pid"
              value={pid}
              type="number"
              required
              onChange={(e) => setPid(e.target.value)}
              placeholder="63298191381"
            />
          </div>
        )}

        {socialsAccountTypesLists.includes(accountType) && (
          <div className="flex flex-col">
            <label htmlFor="link" className="font-light text-sm">
              Link
            </label>
            <Input
              id="link"
              required
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://tiktok.com/username"
            />
          </div>
        )}

        {socialsAccountTypesLists.includes(accountType) && (
          <div className="flex flex-col">
            <label htmlFor="link" className="font-light text-sm">
              Followers
            </label>
            <Input
              id="level"
              value={followers}
              type="number"
              required
              onChange={(e) => setFollowers(e.target.value)}
              placeholder="3000"
            />
          </div>
        )}

        <FormError message={error} skeleton />
        <FormSuccess message={success} skeleton />
        <Button disabled={loading || done}>
          {formType == "create" ? "Publish" : "Save"}
        </Button>
      </div>
    </form>
  );
};
export default AccountForm;
