import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import EquipmentStatusBadge from "../../components/EquipmentStatusBadge";

import {
  getEquipment,
  addEquipment,
  deleteEquipment
}
from "../../services/equipmentService";

function Equipment() {

  const [equipment, setEquipment] = useState([]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    equipment_name: "",
    equipment_type: "",
    serial_number: "",
    location: "",
    status: "Working"
  });

  async function loadEquipment() {

    const data = await getEquipment();

    setEquipment(data);

  }

  useEffect(() => {

    loadEquipment();

  }, []);

  async function handleSubmit(e) {

    e.preventDefault();

    await addEquipment(form);

    setForm({
      equipment_name: "",
      equipment_type: "",
      serial_number: "",
      location: "",
      status: "Working"
    });

    loadEquipment();

  }

  async function handleDelete(id) {

    const confirmDelete =
      window.confirm(
        "Delete this equipment?"
      );

    if (!confirmDelete) return;

    await deleteEquipment(id);

    loadEquipment();

  }

  const filteredEquipment =
    equipment.filter((item) =>
      item.equipment_name
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <Layout>

      <div
        className="
        flex
        justify-between
        items-center
        mb-6
        "
      >

        <h1
          className="
          text-3xl
          font-bold
          "
        >
          Equipment Management
        </h1>

        <span
          className="
          bg-blue-100
          text-blue-700
          px-4
          py-2
          rounded-lg
          font-medium
          "
        >
          {equipment.length} Equipment
        </span>

      </div>

      {/* Add Equipment Form */}

      <div
        className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-6
        mb-6
        "
      >

        <h2
          className="
          text-xl
          font-semibold
          mb-4
          "
        >
          Add Equipment
        </h2>

        <form onSubmit={handleSubmit}>

          <div
            className="
            grid
            grid-cols-1
            md:grid-cols-2
            lg:grid-cols-4
            gap-4
            "
          >

            <Input
              label="Equipment Name"
              value={form.equipment_name}
              onChange={(e) =>
                setForm({
                  ...form,
                  equipment_name:
                    e.target.value
                })
              }
            />

            <Input
              label="Type"
              value={form.equipment_type}
              onChange={(e) =>
                setForm({
                  ...form,
                  equipment_type:
                    e.target.value
                })
              }
            />

            <Input
              label="Serial Number"
              value={form.serial_number}
              onChange={(e) =>
                setForm({
                  ...form,
                  serial_number:
                    e.target.value
                })
              }
            />

            <Input
              label="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location:
                    e.target.value
                })
              }
            />

          </div>

          <div className="mt-4">

            <label
              className="
              block
              mb-2
              text-sm
              font-medium
              "
            >
              Status
            </label>

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status:
                    e.target.value
                })
              }
              className="
              border
              rounded-lg
              px-4
              py-2
              w-full
              "
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

          </div>

          <div className="mt-6">

            <Button type="submit">

              Add Equipment

            </Button>

          </div>

        </form>

      </div>

      {/* Search */}

      <div
        className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-6
        mb-6
        "
      >

        <Input
          label="Search Equipment"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="Search equipment..."
        />

      </div>

      {/* Equipment Table */}

      <div
        className="
        bg-white
        rounded-xl
        shadow-sm
        border
        overflow-hidden
        "
      >

        <div
          className="
          p-6
          border-b
          "
        >

          <h2
            className="
            text-xl
            font-semibold
            "
          >
            Equipment List
          </h2>

        </div>

        <table
          className="
          w-full
          "
        >

          <thead
            className="
            bg-slate-50
            "
          >

            <tr>

              <th className="text-left p-4">
                Name
              </th>

              <th className="text-left p-4">
                Type
              </th>

              <th className="text-left p-4">
                Serial Number
              </th>

              <th className="text-left p-4">
                Location
              </th>

              <th className="text-left p-4">
                Status
              </th>

              <th className="text-left p-4">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredEquipment.map(
              (item) => (

                <tr
                  key={item.id}
                  className="
                  border-b
                  hover:bg-slate-50
                  "
                >

                  <td className="p-4">
                    {
                      item.equipment_name
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.equipment_type
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.serial_number
                    }
                  </td>

                  <td className="p-4">
                    {
                      item.location
                    }
                  </td>

                  <td className="p-4">

                    <EquipmentStatusBadge
                      status={
                        item.status
                      }
                    />

                  </td>

                  <td className="p-4">

                    <button
                      onClick={() =>
                        handleDelete(
                          item.id
                        )
                      }
                      className="
                      bg-red-600
                      text-white
                      px-3
                      py-1
                      rounded-lg
                      hover:bg-red-700
                      "
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default Equipment;