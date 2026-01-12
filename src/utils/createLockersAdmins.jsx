const createLockersAdmins = (id_user = null) => {
  const casilleros = [];

  for (let i = 1; i <= 36; i++) {
    casilleros.push({
      id_locker: i,
      placa: null,
      estado: false,
      id_user,
    });
  }

  return casilleros;
};

export default createLockersAdmins;
