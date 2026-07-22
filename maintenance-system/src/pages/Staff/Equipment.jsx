import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import EquipmentStatusBadge from "../../components/EquipmentStatusBadge";

import {
  getEquipment,
  addEquipment,
  deleteEquipment,
} from "../../services/equipmentService";


function Equipment() {

  const [equipment, setEquipment] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [form, setForm] = useState({
    equipment_name: "",
    equipment_type: "",
    serial_number: "",
    location: "",
    status: "Working",
  });


  function updateForm(changes) {

    setForm({
      ...form,
      ...changes,
    });

    setFormError("");
    setSuccessMessage("");

  }


  async function loadEquipment() {

    try {

      const data = await getEquipment();

      setEquipment(data);

    } catch (error) {

      console.error(error);

      setFormError(
        "Failed to load equipment."
      );

    }

  }


  useEffect(() => {

    loadEquipment();

  }, []);



  async function handleSubmit(e) {

    e.preventDefault();

    setFormError("");
    setSuccessMessage("");


    if (!form.equipment_name.trim()) {

      setFormError(
        "Please enter equipment name"
      );

      return;

    }


    if (!form.equipment_type.trim()) {

      setFormError(
        "Please enter equipment type"
      );

      return;

    }


    if (!form.serial_number.trim()) {

      setFormError(
        "Please enter serial number"
      );

      return;

    }


    if (!form.location.trim()) {

      setFormError(
        "Please enter location"
      );

      return;

    }


    setLoading(true);


    try {

      await addEquipment(form);


      setSuccessMessage(
        "Equipment added successfully"
      );


      setForm({

        equipment_name: "",
        equipment_type: "",
        serial_number: "",
        location: "",
        status: "Working",

      });


      loadEquipment();


    } catch (error) {

      console.error(error);


      setFormError(
        error.response?.data?.error ||
        "Failed to add equipment"
      );


    } finally {

      setLoading(false);

    }

  }




  async function handleDelete(id) {

    setFormError("");
    setSuccessMessage("");


    const confirmDelete =
      window.confirm(
        "Delete this equipment?"
      );


    if (!confirmDelete)
      return;



    try {

      await deleteEquipment(id);


      setSuccessMessage(
        "Equipment deleted successfully"
      );


      loadEquipment();


    } catch (error) {

      console.error(error);


      setFormError(
        error.response?.data?.error ||
        error.message ||
        "Failed to delete equipment"
      );

    }

  }




  const filteredEquipment =
    equipment.filter((item) => {

      const matchesSearch =
        item.equipment_name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;



      return matchesSearch && matchesStatus;

    });



  return (

    <Layout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Equipment Management
          </h1>

          <p className="text-gray-500 mt-1">
            Add, track, and manage all facility equipment.
          </p>

        </div>


        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">

          {equipment.length} Equipment

        </span>

      </div>




      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">


        <h2 className="text-lg font-semibold mb-4">
          Add Equipment
        </h2>



        <form onSubmit={handleSubmit}>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">


            <Input
              label="Equipment Name"
              value={form.equipment_name}
              onChange={(e) =>
                updateForm({
                  equipment_name: e.target.value,
                })
              }
            />


            <Input
              label="Type"
              value={form.equipment_type}
              onChange={(e) =>
                updateForm({
                  equipment_type: e.target.value,
                })
              }
            />


            <Input
              label="Serial Number"
              value={form.serial_number}
              onChange={(e) =>
                updateForm({
                  serial_number: e.target.value,
                })
              }
            />


            <Input
              label="Location"
              value={form.location}
              onChange={(e) =>
                updateForm({
                  location: e.target.value,
                })
              }
            />


          </div>



          <select
            value={form.status}
            onChange={(e) =>
              updateForm({
                status: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-2 w-full mt-4"
          >

            <option>
              Working
            </option>

            <option>
              Under Repair
            </option>

            <option>
              Damaged
            </option>

          </select>




          {formError && (

            <p className="text-sm text-red-600 mt-4">
              {formError}
            </p>

          )}



          {successMessage && (

            <p className="text-sm text-green-600 mt-4">
              {successMessage}
            </p>

          )}



          <div className="mt-6">

            <Button
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Adding..."
                : "Add Equipment"
              }

            </Button>


          </div>


        </form>


      </div>





      <div className="bg-white border rounded-2xl shadow-sm p-6 mb-6">


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


          <div className="md:col-span-2">

            <Input
              label="Search Equipment"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search by equipment name..."
            />

          </div>



          <div>

            <label className="block mb-2 text-sm font-medium text-gray-700">

              Filter by Status

            </label>


            <select

              value={statusFilter}

              onChange={(e) =>
                setStatusFilter(e.target.value)
              }

              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"

            >

              <option value="All">
                All Statuses
              </option>

              <option value="Working">
                Working
              </option>

              <option value="Under Repair">
                Under Repair
              </option>

              <option value="Damaged">
                Damaged
              </option>

            </select>

          </div>


        </div>


      </div>






      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">


        <div className="p-6 border-b border-gray-100 flex items-center justify-between">

          <h2 className="text-lg font-semibold text-gray-900">
            Equipment List
          </h2>

        </div>




        {filteredEquipment.length === 0 ? (

          <p className="text-sm text-gray-400 py-12 text-center">

            No equipment matches your search or filter.

          </p>


        ) : (


          <table className="w-full text-sm">


            <thead>

              <tr className="bg-slate-50 border text-left">

                <th className="p-4 font-medium text-gray-500">
                  Name
                </th>

                <th className="p-4 font-medium text-gray-500">
                  Type
                </th>

                <th className="p-4 font-medium text-gray-500">
                  Serial Number
                </th>

                <th className="p-4 font-medium text-gray-500">
                  Location
                </th>

                <th className="p-4 font-medium text-gray-500">
                  Status
                </th>

                <th className="p-4 font-medium text-gray-500">
                  Action
                </th>

              </tr>

            </thead>





            <tbody className="divide-y divide-gray-100">


              {filteredEquipment.map((item) => (

                <tr
                  key={item.id}
                  className="hover:bg-slate-50"
                >

                  <td className="p-4 font-medium text-gray-800">

                    {item.equipment_name}

                  </td>


                  <td className="p-4 text-gray-600">

                    {item.equipment_type}

                  </td>


                  <td className="p-4 text-gray-600">

                    {item.serial_number}

                  </td>


                  <td className="p-4 text-gray-600">

                    {item.location}

                  </td>


                  <td className="p-4">

                    <EquipmentStatusBadge
                      status={item.status}
                    />

                  </td>


                  <td className="p-4">

                    <button

                      onClick={() =>
                        handleDelete(item.id)
                      }

                      className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg font-medium transition-colors"

                    >

                      Delete

                    </button>


                  </td>


                </tr>


              ))}


            </tbody>


          </table>


        )}


      </div>


    </Layout>

  );

}


export default Equipment;