import { supabase } from "@/supabase/supabase";

const createLockersAdmins = async (id_user) => {
  const casilleros = [];

  for (let i = 1; i <= 36; i++) {
    casilleros.push({
      id_locker: i,
      placa: null,
      estado: false,
      id_user: id_user,
    });
  }

  const { error } = await supabase.from("casilleros").insert(casilleros);

  if (error) {
    console.log("Error al crear casilleros:", error);
  } else {
    console.log("✅ Casilleros creados correctamente para el admin.");
  }
};

export default createLockersAdmins;
