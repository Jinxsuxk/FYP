import Layout from "../../components/Layout";

import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  getHistory
}
from "../../services/historyService";

function MaintenanceHistory() {

  const [history, setHistory] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    loadHistory();

  }, []);

  async function loadHistory() {

    const data =
      await getHistory();

    setHistory(data);

  }

  function exportHistoryPdf() {

    const doc = new jsPDF();

    doc.text(
        "Maintenance History Report",
        14,
        15
    );

    autoTable(doc, {
        head: [[
            "Equipment",
            "Issue",
            "Notes"
        ]],

        body: history.map(item => [
            item.maintenance_request
                ?.equipment
                ?.equipment_name || "",

            item.maintenance_request
                ?.issue_description || "",

            item.repair_notes || ""
        ])
    });

    doc.save(
        "maintenance-history.pdf"
    );
}

  const filteredHistory =
    history.filter(
      (item) =>

        item
          .maintenance_request
          ?.equipment
          ?.equipment_name

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
          Maintenance History
        </h1>

        <span
          className="
          bg-green-100
          text-green-700
          px-4
          py-2
          rounded-lg
          font-medium
          "
        >
          {history.length}
          {" "}Completed Repairs
        </span>

        <button
            onClick={exportHistoryPdf}
            className="
            bg-red-600
            hover:bg-red-700
            text-white
            px-4
            py-2
            rounded-lg
            "
            >
            Export PDF
        </button>

      </div>

      {/* Summary Card */}

      <div
        className="
        bg-white
        border
        rounded-xl
        shadow-sm
        p-6
        mb-6
        "
      >

        <p
          className="
          text-gray-500
          "
        >
          Total Completed Maintenance
        </p>

        <p
          className="
          text-3xl
          font-bold
          mt-2
          "
        >
          {history.length}
        </p>

      </div>

      {/* Search */}

      <div
        className="
        bg-white
        border
        rounded-xl
        shadow-sm
        p-6
        mb-6
        "
      >

        <label
          className="
          block
          mb-2
          text-sm
          font-medium
          "
        >
          Search Equipment
        </label>

        <input

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

          placeholder="
          Search equipment...
          "

          className="
          w-full
          border
          rounded-lg
          px-4
          py-2
          "
        />

      </div>

      {/* History Table */}

      <div
        className="
        bg-white
        border
        rounded-xl
        shadow-sm
        overflow-hidden
        "
      >

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

              <th
                className="
                text-left
                p-4
                "
              >
                Equipment
              </th>

              <th
                className="
                text-left
                p-4
                "
              >
                Issue
              </th>

              <th
                className="
                text-left
                p-4
                "
              >
                Repair Notes
              </th>

              <th
                className="
                text-left
                p-4
                "
              >
                Completed Date
              </th>

            </tr>

          </thead>

          <tbody>

            {
              filteredHistory.map(
                (item) => (

                  <tr

                    key={item.id}

                    className="
                    border-b
                    hover:bg-slate-50
                    transition
                    "
                  >

                    <td
                      className="
                      p-4
                      font-medium
                      "
                    >

                      {
                        item
                          .maintenance_request
                          ?.equipment
                          ?.equipment_name
                      }

                    </td>

                    <td
                      className="
                      p-4
                      "
                    >

                      {
                        item
                          .maintenance_request
                          ?.issue_description
                      }

                    </td>

                    <td
                      className="
                      p-4
                      max-w-md
                      "
                    >

                      {
                        item.repair_notes
                      }

                    </td>

                    <td
                      className="
                      p-4
                      "
                    >

                      {
                        new Date(
                          item.created_at
                        )
                        .toLocaleDateString()
                      }

                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </Layout>

  );

}

export default MaintenanceHistory;