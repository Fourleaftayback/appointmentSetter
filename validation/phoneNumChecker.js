const checkUSnumber = value => {
  const usFormat = new RegExp(
    /^(1\s?)?((\([0-9]{3}\))|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/g
  );
  return usFormat.test(value);
};

module.exports = checkUSnumber;
