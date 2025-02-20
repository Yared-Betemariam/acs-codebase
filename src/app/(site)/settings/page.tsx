import { SettingTabs } from "@/features/settings/components/Tabs";

const SettingsPage = () => {
  return (
    <main className="wrapper pt-28 pb-14 flex flex-1 flex-col gap-4">
      <h1 className="h1">Settings</h1>
      <SettingTabs />
    </main>
  );
};

export default SettingsPage;
