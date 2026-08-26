import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ModelManagement.css";

const ModelManagement = () => {
  const [models, setModels] = useState([]);
  const [showModal, setShowModal] = useState(false);

const [selectedModel, setSelectedModel] = useState({
  id: "",
  modelName: "",
  version: "",
  algorithm: "",
  accuracy: "",
  trainingDate: "",
  status: "",
  description: "",
});

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://localhost:8089/models");
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };
  const activateModel = async (id) => {
  try {
    await axios.patch(`http://localhost:8089/models/${id}/activate`);
    fetchModels();
  } catch (error) {
    console.error("Error activating model:", error);
  }
};

const deactivateModel = async (id) => {
  try {
    await axios.patch(`http://localhost:8089/models/${id}/deactivate`);
    fetchModels();
  } catch (error) {
    console.error("Error deactivating model:", error);
  }
};

const editModel = (model) => {
  setSelectedModel(model);
  setShowModal(true);
};
const handleChange = (e) => {
  setSelectedModel({
    ...selectedModel,
    [e.target.name]: e.target.value,
  });
};
const updateModel = async () => {
  try {
    await axios.put(
      `http://localhost:8089/models/${selectedModel.id}`,
      selectedModel
    );

    setShowModal(false);
    fetchModels();
  } catch (error) {
    console.error("Error updating model:", error);
  }
};

  return (
    <div className="container mt-4 model-management">
    <div className="card shadow model-card">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0">Model Management</h3>
        </div>

        <div className="card-body">
           <div className="table-responsive">
          <table className="table table-bordered table-hover text-center">
            <thead className="table-dark">
              <tr>
                <th>Model Name</th>
                <th>Version</th>
                <th>Algorithm</th>
                <th>Accuracy</th>
                <th>Training Date</th>
                <th>Status</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {models.length > 0 ? (
                models.map((model) => (
                  <tr key={model.id}>
                    <td>{model.modelName}</td>
                    <td>{model.version}</td>
                    <td>{model.algorithm}</td>
                    <td>{model.accuracy}%</td>
                    <td>{model.trainingDate}</td>
                    <td>
                      <span
                        className={
                          model.status === "Active"
                            ? "badge bg-success"
                            : "badge bg-secondary"
                        }
                      >
                        {model.status}
                      </span>
                    </td>
                    <td>{model.description}</td>

                    
          <td>
  <div className="d-flex justify-content-center align-items-center gap-2">

    <button
      className="btn btn-outline-primary btn-sm"
      onClick={() => editModel(model)}
    >
      <i className="bi bi-pencil-square me-1"></i>
      Edit
    </button>

    {model.status === "Active" ? (
      <button
        className="btn btn-outline-danger btn-sm"
        onClick={() => deactivateModel(model.id)}
      >
        <i className="bi bi-x-circle me-1"></i>
        Deactivate
      </button>
    ) : (
      <button
        className="btn btn-outline-success btn-sm"
        onClick={() => activateModel(model.id)}
      >
        <i className="bi bi-check-circle me-1"></i>
        Activate
      </button>
    )}

  </div>
</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="no-data">No Models Found</td>
                </tr>
              )}
            </tbody>
          </table>
          </div>

        </div> 
      </div>
      {showModal && (
  <div
    className="modal d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">Edit Model</h5>

          <button
            type="button"
            className="btn-close"
            onClick={() => setShowModal(false)}
          ></button>
        </div>

        <div className="modal-body">

          <div className="mb-3">
            <label className="form-label">Model Name</label>
            <input
              type="text"
              className="form-control"
              value={selectedModel.modelName}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Version</label>
            <input
              type="text"
              className="form-control"
              name="version"
              value={selectedModel.version}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Algorithm</label>
            <input
              type="text"
              className="form-control"
              name="algorithm"
              value={selectedModel.algorithm}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Accuracy</label>
            <input
              type="number"
              className="form-control"
              name="accuracy"
              value={selectedModel.accuracy}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Training Date</label>
            <input
              type="date"
              className="form-control"
              name="trainingDate"
              value={selectedModel.trainingDate}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={selectedModel.description}
              onChange={handleChange}
            ></textarea>
          </div>

        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-primary"
            onClick={updateModel}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ModelManagement;