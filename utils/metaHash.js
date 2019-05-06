import sha256 from "js-sha256";

const metahash = response => {
  const owner = response[0];
  const level = response[1];
  const status = response[2];
  const timestamp = response[3];

  const str = `${owner}-${level}-${status}-${timestamp}`;

  const hash = sha256(str);
  return hash;
};

export default metahash;
