

import { ChevronLeft } from 'lucide-react';

export default function SWMSForm({ formData, setFormData, onNext, onBack }) {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleCompanyInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      companyInformation: {
        ...prev.companyInformation,
        [name]: value
      }
    }));
  };


  const handlePrincipalContractorChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      companyInformation: {
        ...prev.companyInformation,
        principalContractor: {
          ...prev.companyInformation.principalContractor,
          [name]: value
        }
      }
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    onNext();
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <div className="flex-1 ">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-8 col-md-8">
            <form className="p-4 space-y-6 shadow-sm bg-white rounded border " onSubmit={handleNext}>
              {/* SWMS Details Section */}
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">SWMS Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="swmsName"
                    placeholder="Enter SWMS name"
                    value={formData.swmsName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Site Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="siteAddress"
                    placeholder="Enter site address"
                    value={formData.siteAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    placeholder="Enter company name"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Responsible Person Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="responsiblePersonName"
                    placeholder="Enter responsible person name"
                    value={formData.responsiblePersonName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Date Created</label>
                  <input
                    type="date"
                    name="dateCreated"
                    value={formData.dateCreated}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              {/* Company Information Section */}
              <div className="bg-white p-4 rounded border">
                <h4 className="font-medium mb-3">Company Information</h4>
                <div className="space-y-3">
                  <div className="form-group">
                    <label className="form-label">Company Name</label>
                    <input
                      type="text"
                      value={formData.companyInformation.companyName}
                      onChange={handleCompanyInfoChange}
                      name="companyName"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ABN</label>
                    <input
                      type="text"
                      value={formData.companyInformation.abn}
                      onChange={handleCompanyInfoChange}
                      name="abn"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Address</label>
                    <input
                      type="text"
                      value={formData.companyInformation.address}
                      onChange={handleCompanyInfoChange}
                      name="address"
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="text"
                      value={formData.companyInformation.contactNumber}
                      onChange={handleCompanyInfoChange}
                      name="contactNumber"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              {/* Principal Contractor Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Principal Contractor</h4>
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    value={formData.companyInformation.principalContractor.name}
                    onChange={handlePrincipalContractorChange}
                    name="name"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Person</label>
                  <input
                    type="text"
                    value={formData.companyInformation.principalContractor.contactPerson}
                    onChange={handlePrincipalContractorChange}
                    name="contactPerson"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Contact Number</label>
                  <input
                    type="text"
                    value={formData.companyInformation.principalContractor.contactNumber}
                    onChange={handlePrincipalContractorChange}
                    name="contactNumber"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="flex justify-end max-w-2xl ">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}