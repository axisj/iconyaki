import { IconyakiIcon } from "../iconyaki-react/@types";
import { useCallback, useEffect, useState } from "react";
import service from "../service";

export function useIconsData(projectName?: string) {
  const [icons, setIcons] = useState<IconyakiIcon[]>([]);
  const [loading, setLoading] = useState(false);

  const getIcons = useCallback(async () => {
    try {
      if (!projectName) return setIcons([]);
      const data = await service.getIcons({ projectName });

      setIcons(data.icons);
    } catch (err: any) {
      console.error(err);
    }
  }, [projectName]);

  useEffect(() => {
    getIcons().then();

    return () => {
      setIcons([]);
    };
  }, [getIcons]);

  return {
    icons,
    getIcons,
    loading
  };
}
