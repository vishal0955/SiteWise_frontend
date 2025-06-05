import { useState } from 'react';
import { Search, Download, AlertTriangle, CheckCircle, Eye, Printer } from 'lucide-react';

export default function PPERegisterSubcontractor() {
  const [activeTab, setActiveTab] = useState('assigned');
  const [expandedCategory, setExpandedCategory] = useState('highRisk');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Mock data for subcontractor view
  const companyName = "Premier Painters";
  
  const assignedTemplates = {
    highRisk: [],
    generalTrades: [
      {
        id: 3,
        taskName: 'Painting',
        description: 'Interior and exterior painting works',
        ppeItems: [
          { name: 'Safety Glasses', mandatory: true, standard: 'AS/NZS 1337' },
          { name: 'Respirator', mandatory: true, standard: 'AS/NZS 1716' },
          { name: 'Gloves', mandatory: true, standard: 'AS/NZS 2161' },
          { name: 'Steel Cap Boots', mandatory: true, standard: 'AS/NZS 2210' },
          { name: 'High Visibility Vest', mandatory: false, standard: 'AS/NZS 4602' }
        ]
      }
    ],
    siteWide: [
      {
        id: 5,
        taskName: 'General Site Access',
        description: 'Default PPE requirements for all site personnel',
        ppeItems: [
          { name: 'Hard Hat', mandatory: true, standard: 'AS/NZS 1801' },
          { name: 'High Visibility Vest', mandatory: true, standard: 'AS/NZS 4602' },
          { name: 'Steel Cap Boots', mandatory: true, standard: 'AS/NZS 2210' },
          { name: 'Safety Glasses', mandatory: true, standard: 'AS/NZS 1337' }
        ]
      }
    ]
  };
  
  const complianceHistory = [
    {
      date: 'May 8, 2025',
      time: '08:32 AM',
      worker: 'John Smith',
      missingPpe: 'Respirator',
      status: 'Warning',
      notes: 'Worker permitted on site after retrieving respirator from vehicle.'
    },
    {
      date: 'May 1, 2025',
      time: '07:45 AM',
      worker: 'Lisa Johnson',
      missingPpe: 'Safety Glasses',
      status: 'Resolved',
      notes: 'Safety glasses provided from site supplies.'
    },
    {
      date: 'April 27, 2025',
      time: '09:15 AM',
      worker: 'Robert Davis',
      missingPpe: 'None',
      status: 'Compliant',
      notes: 'All required PPE verified and correct.'
    }
  ];
  
  // Function to toggle category expansion
  const toggleCategory = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
  
  // Filter templates based on search term and category
  const getFilteredTemplates = () => {
    let filteredResults = {};
    
    Object.keys(assignedTemplates).forEach(category => {
      if (filterCategory === 'all' || filterCategory === category) {
        filteredResults[category] = assignedTemplates[category].filter(template => 
          template.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          template.ppeItems.some(ppe => ppe.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }
    });
    
    return filteredResults;
  };
  
  const filteredTemplates = getFilteredTemplates();
  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Task-Based PPE Register</h1>
            <p className="text-sm">{companyName} - PPE Requirements</p>
          </div>
          <button className="bg-white text-blue-600 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
            <Printer className="h-4 w-4" />
            <span>Print All Requirements</span>
          </button>
        </div>
      </div>
      
      {/* Navigation Tabs */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="flex">
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'assigned' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('assigned')}
            >
              Assigned PPE Requirements
            </button>
            <button 
              className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'compliance' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('compliance')}
            >
              Compliance History
            </button>
          </nav>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {activeTab === 'assigned' && (
          <div>
            {/* Search and Filter Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search tasks, PPE items..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              
              <div className="w-full md:w-auto">
                <select 
                  className="border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="highRisk">High-Risk Works</option>
                  <option value="generalTrades">General Trades</option>
                  <option value="siteWide">Site-Wide Requirements</option>
                </select>
              </div>
            </div>
            
            {/* Information Banner */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-6">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-yellow-800">Important Notice</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    All workers must acknowledge possession of required PPE during daily site sign-in.
                    Failure to have proper PPE may result in denied site access.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Templates Display */}
            {Object.keys(filteredTemplates).map(category => (
              filteredTemplates[category].length > 0 && (
                <div key={category} className="mb-8">
                  <div 
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-t-lg cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <h2 className="text-lg font-semibold">
                      {category === 'highRisk' && 'High-Risk Works'}
                      {category === 'generalTrades' && 'General Trades'}
                      {category === 'siteWide' && 'Site-Wide Requirements'}
                    </h2>
                    <span className="text-gray-500">{expandedCategory === category ? '−' : '+'}</span>
                  </div>
                  
                  {expandedCategory === category && (
                    <div className="bg-white border border-gray-200 rounded-b-lg shadow-sm overflow-hidden">
                      {filteredTemplates[category].map(template => (
                        <div key={template.id} className="border-b last:border-b-0 p-4">
                          <div>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-lg font-medium">{template.taskName}</h3>
                                <p className="text-sm text-gray-500">{template.description}</p>
                              </div>
                              <button className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                                <Download className="h-4 w-4" />
                                <span>Download</span>
                              </button>
                            </div>
                            
                            <div className="mt-4">
                              <h4 className="text-sm font-medium text-gray-700 mb-2">Required PPE:</h4>
                              <table className="min-w-full divide-y divide-gray-200" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
                                <thead className="bg-gray-50">
                                  <tr>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PPE Item</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Standard</th>
                                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {template.ppeItems.map((item, index) => (
                                    <tr key={index}>
                                      <td className="px-4 py-2 whitespace-nowrap">{item.name}</td>
                                      <td className="px-4 py-2 whitespace-nowrap">{item.standard}</td>
                                      <td className="px-4 py-2 whitespace-nowrap">
                                        {item.mandatory ? (
                                          <span className="flex items-center text-red-600">
                                            <AlertTriangle className="h-4 w-4 mr-1" />
                                            Mandatory
                                          </span>
                                        ) : (
                                          <span className="text-blue-600">Recommended</span>
                                        )}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            ))}
            
            {/* No results message */}
            {Object.values(filteredTemplates).every(category => category.length === 0) && (
              <div className="bg-white p-8 text-center rounded-lg border">
                <p className="text-gray-500">No PPE requirements found matching your search criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'compliance' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-medium mb-4">PPE Compliance History</h2>
            <p className="text-gray-600 mb-6">Review previous PPE compliance records for your company.</p>
            
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="w-full md:w-1/3">
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 h-full">
                  <h3 className="font-medium text-blue-800 mb-2">Company Compliance Rate</h3>
                  <div className="text-3xl font-bold text-blue-600">87.2%</div>
                  <p className="text-sm text-blue-800 mt-1">Last 30 days</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <div className="bg-green-50 border border-green-100 rounded-lg p-4 h-full">
                  <h3 className="font-medium text-green-800 mb-2">Most Common Item</h3>
                  <div className="text-xl font-bold text-green-600">Hard Hat</div>
                  <p className="text-sm text-green-800 mt-1">98.5% compliance rate</p>
                </div>
              </div>
              
              <div className="w-full md:w-1/3">
                <div className="bg-red-50 border border-red-100 rounded-lg p-4 h-full">
                  <h3 className="font-medium text-red-800 mb-2">Needs Improvement</h3>
                  <div className="text-xl font-bold text-red-600">Respirator</div>
                  <p className="text-sm text-red-800 mt-1">76.3% compliance rate</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">Recent Records</h3>
              <table className="min-w-full divide-y divide-gray-200" style={{ border: '1px solid #dee2e6', borderRadius: '8px' }}>
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Worker</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Missing PPE</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {complianceHistory.map((record, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{record.date} {record.time}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{record.worker}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.missingPpe === 'None' ? (
                          <span className="text-green-600">All PPE Compliant</span>
                        ) : (
                          record.missingPpe
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {record.status === 'Warning' && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Warning</span>
                        )}
                        {record.status === 'Resolved' && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Resolved</span>
                        )}
                        {record.status === 'Compliant' && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Compliant</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-800">
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="flex justify-end">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Export History</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}