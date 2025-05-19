export function parsePlayers(json) {
  if (!Array.isArray(json)) throw new Error("Nieprawidłowa struktura JSON (gracze)");

  return json.map((item, idx) => {
    if (!item.name || !item.surname || !item.class) {
      throw new Error(`Brakuje pól w rekordzie gracza nr ${idx + 1}`);
    }
    return {
      name: item.name,
      surname: item.surname,
      class: item.class,
    };
  });
}
