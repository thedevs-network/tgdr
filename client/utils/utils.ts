export const shortenLongName = (name: string, maxChars: number) => 
  name.length > maxChars 
    ? `${name.slice(0, maxChars)}...` 
    : name;