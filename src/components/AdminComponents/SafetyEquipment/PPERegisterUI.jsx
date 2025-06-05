import { useState } from "react";
import {
  Search,
  Plus,
  X,
  Edit2,
  Save,
  AlertTriangle,
  Download,
  Eye,
  FireExtinguisher,
} from "lucide-react";
import { Modal ,Button } from "react-bootstrap";

export default function PPERegisterUI() {
  const [activeTab, setActiveTab] = useState("templates");
  const [expandedCategory, setExpandedCategory] = useState("highRisk");
  const [templates, setTemplates] = useState({
    highRisk: [
      {
        id: 1,
        taskName: "Demolition",
        description: "Structural demolition and debris removal",
        ppeItems: [
          { name: "Hard Hat", mandatory: true, standard: "AS/NZS 1801" },
          { name: "Safety Glasses", mandatory: true, standard: "AS/NZS 1337" },
          { name: "Respirator", mandatory: true, standard: "AS/NZS 1716" },
          { name: "Gloves", mandatory: true, standard: "AS/NZS 2161" },
          { name: "Steel Cap Boots", mandatory: true, standard: "AS/NZS 2210" },
          {
            name: "High Visibility Vest",
            mandatory: true,
            standard: "AS/NZS 4602",
          },
        ],
        assignedTo: ["All Subcontractors"],
      },
      {
        id: 2,
        taskName: "Concrete Cutting",
        description: "Wet and dry concrete cutting operations",
        ppeItems: [
          { name: "Hard Hat", mandatory: true, standard: "AS/NZS 1801" },
          { name: "Face Shield", mandatory: true, standard: "AS/NZS 1337" },
          { name: "Respirator", mandatory: true, standard: "AS/NZS 1716" },
          {
            name: "Cut-Resistant Gloves",
            mandatory: true,
            standard: "AS/NZS 2161",
          },
          { name: "Steel Cap Boots", mandatory: true, standard: "AS/NZS 2210" },
          {
            name: "Hearing Protection",
            mandatory: true,
            standard: "AS/NZS 1270",
          },
          {
            name: "High Visibility Vest",
            mandatory: true,
            standard: "AS/NZS 4602",
          },
        ],
        assignedTo: ["Concrete Specialists Ltd"],
      },
    ],
    generalTrades: [
      {
        id: 3,
        taskName: "Painting",
        description: "Interior and exterior painting works",
        ppeItems: [
          { name: "Safety Glasses", mandatory: true, standard: "AS/NZS 1337" },
          { name: "Respirator", mandatory: true, standard: "AS/NZS 1716" },
          { name: "Gloves", mandatory: true, standard: "AS/NZS 2161" },
          { name: "Steel Cap Boots", mandatory: true, standard: "AS/NZS 2210" },
          {
            name: "High Visibility Vest",
            mandatory: false,
            standard: "AS/NZS 4602",
          },
        ],
        assignedTo: ["Premier Painters", "All Purpose Contractors"],
      },
      {
        id: 4,
        taskName: "Welding",
        description: "Metal fabrication and welding operations",
        ppeItems: [
          { name: "Welding Helmet", mandatory: true, standard: "AS/NZS 1338" },
          { name: "Leather Gloves", mandatory: true, standard: "AS/NZS 2161" },
          {
            name: "Fire-Resistant Clothing",
            mandatory: true,
            standard: "AS/NZS 4824",
          },
          { name: "Steel Cap Boots", mandatory: true, standard: "AS/NZS 2210" },
          { name: "Respirator", mandatory: true, standard: "AS/NZS 1716" },
        ],
        assignedTo: ["MetalWorks Inc."],
      },
    ],
    siteWide: [
      {
        id: 5,
        taskName: "General Site Access",
        description: "Default PPE requirements for all site personnel",
        ppeItems: [
          { name: "Hard Hat", mandatory: true, standard: "AS/NZS 1801" },
          {
            name: "High Visibility Vest",
            mandatory: true,
            standard: "AS/NZS 4602",
          },
          { name: "Steel Cap Boots", mandatory: true, standard: "AS/NZS 2210" },
          { name: "Safety Glasses", mandatory: true, standard: "AS/NZS 1337" },
        ],
        assignedTo: ["All Site Visitors", "All Subcontractors"],
      },
    ],
  });

  const [subcontractors, setSubcontractors] = useState([
    "All Subcontractors",
    "Concrete Specialists Ltd",
    "Premier Painters",
    "MetalWorks Inc.",
    "All Purpose Contractors",
    "All Site Visitors",
  ]);

  const [currentEditing, setCurrentEditing] = useState(null);
  const [newTemplate, setNewTemplate] = useState({
    taskName: "",
    description: "",
    ppeItems: [],
    assignedTo: [],
  });

  const [isAddingTemplate, setIsAddingTemplate] = useState(false);
  const [isAddingPPE, setIsAddingPPE] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newPPEItem, setNewPPEItem] = useState({
    name: "",
    mandatory: true,
    standard: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Handler for expanding/collapsing categories
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };

  // Handler for starting the edit mode
  const handleEdit = (templateId, category) => {
    const template = templates[category].find((t) => t.id === templateId);
    setCurrentEditing({ ...template, category });
  };

  // Handler for saving edits
  const handleSave = () => {
    if (!currentEditing) return;

    const { category, id, ...rest } = currentEditing;
    const updatedTemplates = { ...templates };
    const index = updatedTemplates[category].findIndex((t) => t.id === id);

    if (index !== -1) {
      updatedTemplates[category][index] = { id, ...rest };
      setTemplates(updatedTemplates);
    }

    setCurrentEditing(null);
  };

  // Handler for adding a new PPE item to a template
  const handleAddPPEItem = () => {
    if (newPPEItem?.name && currentEditing) {
      setCurrentEditing({
        ...currentEditing,
        ppeItems: [...currentEditing?.ppeItems, { ...newPPEItem }],
      });

      setNewPPEItem({
        name: "",
        mandatory: true,
        standard: "",
      });

      setIsAddingPPE(false);
    }
  };

  // Handler for removing a PPE item from a template
  const handleRemovePPEItem = (index) => {
    if (currentEditing) {
      const updatedPPEItems = [...currentEditing.ppeItems];
      updatedPPEItems.splice(index, 1);
      setCurrentEditing({
        ...currentEditing,
        ppeItems: updatedPPEItems,
      });
    }
  };

  // Handler for adding a new template
  const handleAddTemplate = () => {
    if (newTemplate.taskName && selectedCategory) {
      const updatedTemplates = { ...templates };
      const newId =
        Math.max(
          ...Object.values(templates)
            .flat()
            .map((t) => t.id)
        ) + 1;

      updatedTemplates[selectedCategory] = [
        ...updatedTemplates[selectedCategory],
        {
          id: newId,
          ...newTemplate,
        },
      ];

      setTemplates(updatedTemplates);
      setNewTemplate({
        taskName: "",
        description: "",
        ppeItems: [],
        assignedTo: [],
      });
      setIsAddingTemplate(false);
    }
  };

  // Filtered templates based on search and category filter
  const getFilteredTemplates = () => {
    let filteredResults = {};

    Object.keys(templates).forEach((category) => {
      if (filterCategory === "all" || filterCategory === category) {
        filteredResults[category] = templates[category].filter(
          (template) =>
            template.taskName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            template.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            template.ppeItems.some((ppe) =>
              ppe.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
      }
    });

    return filteredResults;
  };

  const filteredTemplates = getFilteredTemplates();

  // Common PPE items for dropdown
  const commonPPEItems = [
    "Hard Hat",
    "Safety Glasses",
    "Face Shield",
    "Respirator",
    "Gloves",
    "Cut-Resistant Gloves",
    "Leather Gloves",
    "Steel Cap Boots",
    "High Visibility Vest",
    "Hearing Protection",
    "Harness",
    "Fire-Resistant Clothing",
    "Welding Helmet",
  ];

  return (
    <div className="w-full min-h-screen ">
      {/* Header */}
      <div className="p-4">
        <h2 className="text-2xl font-bold">Task-Based PPE Register</h2>
        <p className="text-sm">
          Manage and configure required PPE for site tasks
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className=" border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex"></nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {activeTab === "templates" && (
          <div>
            {/* Action Bar */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 flex-wrap mb-6">
  {/* Search Input */}
  <div className="relative w-full md:w-96">
    <input
      type="text"
      placeholder="Search tasks, PPE items..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500
        bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
  </div>

  {/* Filters and Button */}
  <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
    <select
      className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full sm:w-auto"
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value)}
    >
      <option value="all">All Categories</option>
      <option className=""value="highRisk">High-Risk Works</option>
      <option value="generalTrades">General Trades</option>
      <option value="siteWide">Site-Wide Requirements</option>
    </select>

    <Button
      className="btn-set-color w-full sm:w-auto"
      onClick={() => setIsAddingTemplate(true)}
    >
      <div className="flex items-center justify-center gap-1">
        <Plus className="h-4 w-4" />
        <span>New Template</span>
      </div>
    </Button>
  </div>
</div>


            {/* Templates Display */}
            {Object.keys(filteredTemplates).map(
              (category) =>
                filteredTemplates[category].length > 0 && (
                  <div key={category} className="mb-8">
                    <div
                      className="flex justify-between items-center bg-gray-300  p-3 rounded-t-lg cursor-pointer"
                      onClick={() => toggleCategory(category)}
                    >
                      <h2 className="text-lg text-gray-800 font-semibold">
                        {category === "highRisk" && "High-Risk Works"}
                        {category === "generalTrades" && "General Trades"}
                        {category === "siteWide" && "Site-Wide Requirements"}
                      </h2>
                      <span className="text-gray-800">
                        {expandedCategory === category ? "−" : "+"}
                      </span>
                    </div>

                    {expandedCategory === category && (
                      <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm overflow-hidden">
                        {filteredTemplates[category].map((template) => (
                          <div
                            key={template.id}
                            className="border-b last:border-b-0"
                          >
                            {currentEditing &&
                            currentEditing.id === template.id ? (
                              <div className="p-4">
                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Task Name
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full border rounded px-3 py-2"
                                    value={currentEditing.taskName}
                                    onChange={(e) =>
                                      setCurrentEditing({
                                        ...currentEditing,
                                        taskName: e.target.value,
                                      })
                                    }
                                  />
                                </div>

                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description
                                  </label>
                                  <textarea
                                    className="w-full border rounded px-3 py-2"
                                    value={currentEditing.description}
                                    onChange={(e) =>
                                      setCurrentEditing({
                                        ...currentEditing,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>

                                <div className="mb-4">
                                  <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                      Required PPE
                                    </label>
                                    <button
                                      className="text-blue-600 text-sm flex items-center"
                                      onClick={() => setIsAddingPPE(true)}
                                    >
                                      <Plus className="h-4 w-4 mr-1" />
                                      Add PPE
                                    </button>
                                  </div>

                                  {isAddingPPE && (
                                    <div className="bg-gray-50 p-3 rounded mb-3">
                                      <div className="flex flex-wrap gap-2 mb-3">
                                        <select
                                          className="border rounded flex-grow px-3 py-2"
                                          value={newPPEItem.name}
                                          onChange={(e) =>
                                            setNewPPEItem({
                                              ...newPPEItem,
                                              name: e.target.value,
                                            })
                                          }
                                        >
                                          <option value="">
                                            Select PPE Item
                                          </option>
                                          {commonPPEItems.map((item) => (
                                            <option key={item} value={item}>
                                              {item}
                                            </option>
                                          ))}
                                          <option value="custom">
                                            Custom Item...
                                          </option>
                                        </select>

                                        {newPPEItem.name === "custom" && (
                                          <input
                                            type="text"
                                            placeholder="Enter custom PPE name"
                                            className="border rounded flex-grow px-3 py-2"
                                            onChange={(e) =>
                                              setNewPPEItem({
                                                ...newPPEItem,
                                                name: e.target.value,
                                              })
                                            }
                                          />
                                        )}

                                        <input
                                          type="text"
                                          placeholder="Safety standard (e.g. AS/NZS 1337)"
                                          className="border rounded flex-grow px-3 py-2"
                                          value={newPPEItem.standard}
                                          onChange={(e) =>
                                            setNewPPEItem({
                                              ...newPPEItem,
                                              standard: e.target.value,
                                            })
                                          }
                                        />

                                        <div className="flex items-center">
                                          <input
                                            type="checkbox"
                                            id="mandatoryCheck"
                                            className="h-4 w-4 text-blue-600 rounded"
                                            checked={newPPEItem.mandatory}
                                            onChange={(e) =>
                                              setNewPPEItem({
                                                ...newPPEItem,
                                                mandatory: e.target.checked,
                                              })
                                            }
                                          />
                                          <label
                                            htmlFor="mandatoryCheck"
                                            className="ml-2 text-sm text-gray-700"
                                          >
                                            Mandatory
                                          </label>
                                        </div>
                                      </div>

                                      <div className="flex justify-end gap-2">
                                        <button
                                          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                                          onClick={() => setIsAddingPPE(false)}
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                                          onClick={handleAddPPEItem}
                                        >
                                          Add Item
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  <table
                                    className="min-w-full divide-y divide-gray-200"
                                    style={{
                                      border: "1px solid #dee2e6",
                                      borderRadius: "8px",
                                    }}
                                  >
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          PPE Item
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Standard
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Mandatory
                                        </th>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                          Actions
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                      {currentEditing.ppeItems.map(
                                        (item, index) => (
                                          <tr key={index}>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                              {item.name}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                              {item.standard}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                              <input
                                                type="checkbox"
                                                checked={item.mandatory}
                                                onChange={(e) => {
                                                  const updatedItems = [
                                                    ...currentEditing.ppeItems,
                                                  ];
                                                  updatedItems[
                                                    index
                                                  ].mandatory =
                                                    e.target.checked;
                                                  setCurrentEditing({
                                                    ...currentEditing,
                                                    ppeItems: updatedItems,
                                                  });
                                                }}
                                                className="h-4 w-4 text-blue-600 rounded"
                                              />
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                              <button
                                                className="text-red-600 hover:text-red-800"
                                                onClick={() =>
                                                  handleRemovePPEItem(index)
                                                }
                                              >
                                                <X className="h-4 w-4" />
                                              </button>
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>

                                <div className="mb-4">
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Assigned To
                                  </label>
                                  <select
                                    multiple
                                    className="w-full border rounded px-3 py-2 h-24"
                                    value={currentEditing.assignedTo}
                                    onChange={(e) => {
                                      const selected = Array.from(
                                        e.target.selectedOptions,
                                        (option) => option.value
                                      );
                                      setCurrentEditing({
                                        ...currentEditing,
                                        assignedTo: selected,
                                      });
                                    }}
                                  >
                                    {subcontractors.map((sub) => (
                                      <option key={sub} value={sub}>
                                        {sub}
                                      </option>
                                    ))}
                                  </select>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Hold Ctrl/Cmd to select multiple
                                  </p>
                                </div>

                                <div className="flex justify-end gap-2">
                                  <button
                                    className="px-4 py-2 btn btn-secondary text-gray-600 hover:text-gray-800"
                                    onClick={() => setCurrentEditing(null)}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center"
                                    onClick={handleSave}
                                  >
                                    <Save className="h-4 w-4 mr-1" />
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h3 className="text-lg font-medium">
                                      {template.taskName}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      {template.description}
                                    </p>
                                  </div>
                                  <button
                                    className="text-blue-600 hover:text-blue-800"
                                    onClick={() =>
                                      handleEdit(template.id, category)
                                    }
                                  >
                                    <Edit2 className="h-5 w-5" />
                                  </button>
                                </div>

                                <div className="mt-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Required PPE:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {template.ppeItems.map((item, index) => (
                                      <div
                                        key={index}
                                        className={`px-3 py-1 rounded-full text-xs flex items-center ${
                                          item.mandatory
                                            ? "bg-red-100 text-red-800"
                                            : "bg-blue-100 text-blue-800"
                                        }`}
                                      >
                                        {item.mandatory && (
                                          <AlertTriangle className="h-3 w-3 mr-1" />
                                        )}
                                        {item.name}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="mt-4">
                                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                                    Assigned To:
                                  </h4>
                                  <div className="flex flex-wrap gap-2">
                                    {template.assignedTo.map(
                                      (assignee, index) => (
                                        <div
                                          key={index}
                                          className="px-3 py-1 bg-gray-100 rounded-full text-xs"
                                        >
                                          {assignee}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
            )}

            {/* No results message */}
            {Object.values(filteredTemplates).every(
              (category) => category.length === 0
            ) && (
              <div className="bg-white p-8 text-center rounded-lg border">
                <p className="text-gray-500">
                  No templates found matching your search criteria.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Other tabs would go here */}
        {activeTab === "induction" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">
              Induction Links Configuration
            </h2>
            <p className="text-gray-600 mb-6">
              Connect PPE templates to induction types to display appropriate
              requirements during worker onboarding.
            </p>

            <table
              className="min-w-full divide-y divide-gray-200"
              style={{ border: "1px solid #dee2e6", borderRadius: "8px" }}
            >
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Induction Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Linked PPE Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    General Site Induction
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    General Site Access
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Demolition Team Induction
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Demolition</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Painting Team Induction
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">Painting</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Edit2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Induction Link</span>
            </button>
          </div>
        )}

        {activeTab === "siteEntry" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">
              Site Entry Configuration
            </h2>
            <p className="text-gray-600 mb-6">
              Configure how PPE requirements are displayed and confirmed during
              site sign-in.
            </p>

            <div className="border rounded-lg p-4 mb-6">
              <h3 className="font-medium mb-2">PPE Acknowledgment Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="requireAcknowledge"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 rounded"
                    checked
                  />
                  <label
                    htmlFor="requireAcknowledge"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Require PPE acknowledgment during sign-in
                  </label>
                </div>

                <div className="flex items-center"></div>
              </div>
            </div>

            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
              <Plus className="h-4 w-4" />
              <span>New Induction Link</span>
            </button>
          </div>
        )}
      </div>

      {isAddingTemplate && (
        <Modal
          show={isAddingTemplate}
          onHide={() => setIsAddingTemplate(false)}
          centered
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add New Template</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  value={currentEditing?.taskName || ""}
                  onChange={(e) =>
                    setCurrentEditing({
                      ...currentEditing,
                      taskName: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  value={currentEditing?.description}
                  onChange={(e) =>
                    setCurrentEditing({
                      ...currentEditing,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-500">
                    Required PPE
                  </label>
                  <button
                    className="text-blue-600 text-sm flex items-center"
                    onClick={() => setIsAddingPPE(true)}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add PPE
                  </button>
                </div>

                {isAddingPPE && (
                  <div className=" p-3 rounded mb-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <select
                        className=" p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        value={newPPEItem?.name}
                        onChange={(e) =>
                          setNewPPEItem({ ...newPPEItem, name: e.target.value })
                        }
                      >
                        <option value="">Select PPE Item</option>
                        {commonPPEItems.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                        <option value="custom">Custom Item...</option>
                      </select>

                      {newPPEItem?.name === "custom" && (
                        <input
                          type="text"
                          placeholder="Enter custom PPE name"
                          className="w-50 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                          onChange={(e) =>
                            setNewPPEItem({
                              ...newPPEItem,
                              name: e.target.value,
                            })
                          }
                        />
                      )}

                      <input
                        type="text"
                        placeholder="Safety standard (e.g. AS/NZS 1337)"
                        className=" w-50 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        value={newPPEItem?.standard}
                        onChange={(e) =>
                          setNewPPEItem({
                            ...newPPEItem,
                            standard: e.target.value,
                          })
                        }
                      />

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="mandatoryCheck"
                          className="h-4 w-4 text-blue-600 rounded"
                          checked={newPPEItem?.mandatory}
                          onChange={(e) =>
                            setNewPPEItem({
                              ...newPPEItem,
                              mandatory: e.target.checked,
                            })
                          }
                        />
                        <label
                          htmlFor="mandatoryCheck"
                          className="ml-2 text-sm text-gray-700"
                        >
                          Mandatory
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        className="px-3 py-1 btn-secondary"
                        onClick={() => setIsAddingPPE(false)}
                      >
                        Cancel
                      </button>
                      <button
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleAddPPEItem}
                      >
                        Add Item
                      </button>
                    </div>
                  </div>
                )}

                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        PPE Item
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Standard
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mandatory
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentEditing?.ppeItems?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item?.name}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          {item?.standard}
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={item?.mandatory}
                            onChange={(e) => {
                              const updatedItems = [
                                ...currentEditing?.ppeItems,
                              ];
                              updatedItems[index].mandatory = e.target.checked;
                              setCurrentEditing({
                                ...currentEditing,
                                ppeItems: updatedItems,
                              });
                            }}
                            className="h-4 w-4 text-blue-600 rounded"
                          />
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap">
                          <button
                            className="text-red-600 hover:text-red-800"
                            onClick={() => handleRemovePPEItem(index)}
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Assign PPE Checklist To
                </label>
                <select
                  className=" w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500
             bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  value={currentEditing?.assignmentType}
                  onChange={(e) => {
                    const assignmentType = e.target.value;
                    setCurrentEditing({
                      ...currentEditing,
                      assignmentType,
                      assignedTo: "", // Reset assigned target
                    });
                  }}
                >
                  <option value="entire_site">Entire Site</option>
                  <option value="subcontractor">Specific Subcontractor</option>
                  <option value="task">Specific Task</option>
                  <option value="area">Specific Area</option>
                </select>
              </div>

              {currentEditing?.assignmentType === "subcontractor" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Subcontractor
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={currentEditing.assignedTo}
                    onChange={(e) =>
                      setCurrentEditing({
                        ...currentEditing,
                        assignedTo: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    {subcontractors.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {currentEditing?.assignmentType === "task" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Task
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={currentEditing?.assignedTo}
                    onChange={(e) =>
                      setCurrentEditing({
                        ...currentEditing,
                        assignedTo: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    {["Wall Building", "fixing Cracks", "welding"].map(
                      (task) => (
                        <option key={task} value={task}>
                          {task}
                        </option>
                      )
                    )}
                  </select>
                </div>
              )}

              {currentEditing?.assignmentType === "area" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Area
                  </label>
                  <select
                    className="w-full border rounded px-3 py-2"
                    value={currentEditing?.assignedTo}
                    onChange={(e) =>
                      setCurrentEditing({
                        ...currentEditing,
                        assignedTo: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select --</option>
                    {["Zone A", "Zone B", "Zone C"].map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                                <select
                                  multiple
                                  className="w-full border rounded px-3 py-2 h-24"
                                  value={currentEditing.assignedTo}
                                  onChange={(e) => {
                                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                                    setCurrentEditing({...currentEditing, assignedTo: selected});
                                  }}
                                >
                                  {subcontractors.map(sub => (
                                    <option key={sub} value={sub}>{sub}</option>
                                  ))}
                                </select>
                                <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple</p>
                              </div> */}

              <div className="flex justify-end gap-2">
                <button
                  className=" px-4 py-2 btn btn-secondary border rounded border-gray-300"
                  onClick={() => setCurrentEditing(null)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary px-4 py-2  rounded hover:bg-blue-700 flex items-center"
                  onClick={handleSave}
                >
                  <div className="flex items-center">
                    <Save className="h-4 w-4 mr-1" />
                    Save Changes
                  </div>
                </button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
