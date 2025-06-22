// src/utils/parseSettings.ts

type RawSetting = {
  name: string;
  value: string | number | boolean | object | null;
  is_json: boolean;
};

/**
 * يحول مصفوفة الإعدادات القادمة من السيرفر إلى كائن Settings جاهز
 */
export function parseSettings(settingsArray: RawSetting[]) {
  const result: Record<string, unknown> = {};

  for (const setting of settingsArray) {
    const { name, value, is_json } = setting;

    if (is_json && typeof value === "string") {
      try {
        result[name] = JSON.parse(value);
      } catch {
        result[name] = value; // fallback
      }
    } else if (!is_json && value === "true") {
      result[name] = true;
    } else if (!is_json && value === "false") {
      result[name] = false;
    } else {
      result[name] = value;
    }
  }

  return result;
}
