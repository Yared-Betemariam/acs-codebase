import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ImageUploadDropzone } from "../account-form/image-upload-dropzone";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMemo, useState, useTransition } from "react";

import {
  accountTypes,
  accountTypesNamed,
  gameAccountTypesLists,
  socialsAccountTypesLists,
} from "@/config";
import { Button } from "@/components/ui/button";
import FormError from "@/components/ui/FormError";
import FormSuccess from "@/components/ui/FormSuccess";
import { update_account } from "../../actions";
import { Account } from "@/mongoose/models/account";
import { useUserAccountsStore } from "../../store";

interface Props {
  account?: Account | undefined;
}

const AccountForm = ({ account }: Props) => {
  const formType = useMemo(() => (account ? "edit" : "create"), [account]);
  const [success, setSuccess] = useState<undefined | string>();
  const [error, setError] = useState<undefined | string>();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState<boolean>(false);

  const handleUpload = (files: File[]) => {
    console.log("Uploaded files:", files);
  };

  // values
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [level, setLevel] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [accountType, setAccountType] = useState<accountTypes>("tiktok");

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

    startTransition(() => {
      update_account(
        {
          type: accountType,
          title,
          description,
          price,
          level,
          link,
        },
        account ? String(account?._id) : undefined
      )
        .then((data) => {
          setError(data?.error);
          setSuccess(data.success);

          if (data.success) {
            setDone(true);
            useUserAccountsStore.getState().loadAccounts();
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex p-6 flex-1 gap-6"
    >
      <ImageUploadDropzone onUpload={handleUpload} />
      <div className="flex flex-col min-w-[60%] gap-2">
        <div className="flex flex-col">
          <label htmlFor="accountType" className="font-light text-sm">
            Account Type
          </label>
          <Select
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
        <FormError message={error} skeleton />
        <FormSuccess message={success} skeleton />
        <Button disabled={isPending || done}>Publish</Button>
      </div>
    </form>
  );
};
export default AccountForm;
