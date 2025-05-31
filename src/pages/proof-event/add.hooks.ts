import { useEffect, useState } from 'react';

const DIGITAL_IDS_KEY = 'DIGITAL_IDS';

type DigitalId = string;

export const useDigitalIds = () => {
  const [digitalIds, setDigitalIds] = useState<DigitalId[]>([]);

  const addDigitalIds = (digitalIds: DigitalId[]) => {
    localStorage.setItem(DIGITAL_IDS_KEY, JSON.stringify(digitalIds));
    setDigitalIds(() => digitalIds);
  };

  useEffect(() => {
    const digitalIds = JSON.parse(
      localStorage.getItem(DIGITAL_IDS_KEY) ?? '[]'
    );

    if (!digitalIds.length) return;

    setDigitalIds(digitalIds);
  }, []);

  return {
    digitalIds,
    addDigitalIds,
  };
};
