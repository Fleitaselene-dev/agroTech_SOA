import type { FC } from "react";
import Dashboard from "../../assets/components/Charts/Dashboard";
import ParcelaTableForm from "../../assets/components/Forms/ParcelaTableForm";
import GanadoTableForm from "../../assets/components/Forms/GanadoTableForm";
import DataSpreadsheet from "../../assets/components/Charts/DataSpreadsheet";
import CultivoTableForm from "../../assets/components/Forms/CultivoTableForm";

const Inventario: FC = () => {
  const handleParcelaSuccess = () => alert("¡Parcela creada con éxito!");
  const handleGanadoSuccess = () => alert("¡Ganado registrado, refrescar vista!");
  const handleCultivoSuccess = () => alert("¡Cultivo registrado, refrescar vista!");

  return (
    <div className="bg-[#f8f8f8] min-h-screen pt-20 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-5xl text-center font-bold">Gestión de Inventario</h1>
      </div>

      <DataSpreadsheet />

      <h1 className="text-3xl font-semibold text-center mt-10">Crea tus propios Registros</h1>
      <div className="w-full p-8 flex space-x-6 py-6 items-stretch mb-8">
        <div className="w-1/3">
          <ParcelaTableForm onSuccess={handleParcelaSuccess} />
        </div>
        <div className="w-1/3">
          <GanadoTableForm onSuccess={handleGanadoSuccess} />
        </div>
        <div className="w-1/3">
          <CultivoTableForm onSuccess={handleCultivoSuccess} />
        </div>
      </div>

      <div className="w-full p-4 rounded-3xl">
        <Dashboard />
      </div>
    </div>
  );
};

export default Inventario;
