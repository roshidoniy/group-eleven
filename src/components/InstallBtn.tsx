// components/InstallButton.tsx
import React, { useState, useEffect } from "react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallButton: React.FC = () => {
  const [installPromptEvent, setInstallPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    const beforeInstallPromptHandler = (event: Event) => {
      // Prevent the default browser prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPromptEvent(event as BeforeInstallPromptEvent);
    };

    const appInstalledHandler = () => {
      setIsInstalled(true);
      setInstallPromptEvent(null);
    };

    window.addEventListener("beforeinstallprompt", beforeInstallPromptHandler);
    window.addEventListener("appinstalled", appInstalledHandler);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        beforeInstallPromptHandler,
      );
      window.removeEventListener("appinstalled", appInstalledHandler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPromptEvent) {
      return;
    }

    // Show the install prompt.
    installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await installPromptEvent.userChoice;

    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the event so it doesn't fire again.
    setInstallPromptEvent(null);
  };

  if (isInstalled) {
    return;
  }

  if (!installPromptEvent) {
    return null; // Don't render the button if the event hasn't fired.
  }

  return (
    <button
      onClick={handleInstallClick}
      className="cursor-pointer z-20 underline"
    >
      Wanna Install App?
    </button>
  );
};

export default InstallButton;
