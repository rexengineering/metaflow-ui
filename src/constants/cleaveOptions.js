export const phoneNumberOptions = {
  numericOnly: true,
  delimiters: ["(", ")", " ", "-"],
  blocks: [0, 3, 0, 3, 4],
};

export const currencyOptions = {
  numeral: true,
  numeralThousandsGroupStyle: "thousand",
};

export const percentOptions = {
  numeral: true,
  numeralThousandsGroupStyle: "none",
};

export const integerOptions = {
  numeral: true,
  numeralThousandsGroupStyle: "none",
  numeralDecimalScale: 0,
};

export const floatOptions = {
  numeral: true,
  numeralThousandsGroupStyle: "none",
  numeralDecimalScale: 4,
};

export default {
  phoneNumberOptions,
  currencyOptions,
  percentOptions,
  integerOptions,
  floatOptions,
};
