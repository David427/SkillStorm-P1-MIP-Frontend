import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './layouts/MainLayout';
import CreateUnitPage from './pages/CreateUnitPage';
import CreateWarehousePage from './pages/CreateWarehousePage';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import UnitPage, { unitLoader } from './pages/UnitPage';
import UpdateUnitPage from './pages/UpdateUnitPage';
import UpdateWarehousePage from './pages/UpdateWarehousePage';
import WarehousePage, { warehouseLoader } from './pages/WarehousePage';

function App() {
  // API requests could/should be in their own component(s), but these props are drilled down to both Warehouse and Unit components
  const BASE_URL = 'http://localhost:8080';

  // WAREHOUSE REQUESTS
  // Update & delete rely on a path var for the idCode, so I'm using React Router
  const updateWarehouse = async (warehouse) => {
    try {
      const response = await fetch(`${BASE_URL}/warehouses/${warehouse.idCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(warehouse)
      });

      if (response.status === 200) {
        toast.success('Warehouse updated successfully.');
      }
      return;
    } catch (err) {
      toast.error('Error updating warehouse, please try again.');
    }
  };

  const deleteWarehouse = async (idCode) => {
    try {
      const response = await fetch(`${BASE_URL}/warehouses/${idCode}`, {
        method: 'DELETE'
      });

      if (response.status === 204) {
        toast.success('Warehouse deleted successfully');
        // Cascade delete in the backend is not functioning; don't want to create orphan records
      } else if ((await response.text()).includes('foreign key')) {
        toast.error(`${idCode} still has units in its stock. Please delete them first.`);
      }
      return;
    } catch (err) {
      toast.error('Error deleting warehouse, please try again.');
    }
  };

  // UNIT REQUESTS
  const updateUnit = async (unit) => {
    try {
      const response = await fetch(`${BASE_URL}/units/${unit.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(unit)
      });

      if (response.status === 200) {
        toast.success('Unit updated successfully');
      }
      return;
    } catch (err) {
      toast.error('Error updating unit, please try again');
    }
  };

  const deleteUnit = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/units/${id}`, {
        method: 'DELETE'
      });

      if (response.status === 204) {
        toast.success('Unit deleted successfully');
      }
      return;
    } catch (err) {
      toast.error('Error deleting unit, please try again');
    }
  };

  // ROUTES
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />

        {/* Warehouses */}
        <Route path="/create-warehouse" element={<CreateWarehousePage />} />
        <Route path="/warehouses/:idCode" element={<WarehousePage deleteWarehouse={deleteWarehouse} />} loader={warehouseLoader} />
        <Route path="/warehouses/:idCode/update" element={<UpdateWarehousePage updateWarehouse={updateWarehouse} />} loader={warehouseLoader} />

        {/* Units */}
        <Route path="/create-unit" element={<CreateUnitPage />} />
        <Route path="/units/:id" element={<UnitPage deleteUnit={deleteUnit} />} loader={unitLoader} />
        <Route path="/units/:id/update" element={<UpdateUnitPage updateUnit={updateUnit} />} loader={unitLoader} />

        {/* Util */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
