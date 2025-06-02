import React from "react";

const PublishScenarioPopup = ({
  showPopup,
  popupUsername,
  popupRole,
  popupCondition,
  popupDescription,
  popupError,
  setPopupCondition,
  setPopupDescription,
  setShowPopup,
  handlePopupSubmit,
}) => {
  if (!showPopup) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.3)",
        zIndex: 10000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <form
        onSubmit={handlePopupSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          minWidth: 340,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          position: "relative",
        }}
      >
        <h3 style={{ margin: 0, textAlign: "center", color: "#333" }}>
          Publish Current Scenario
        </h3>
        <label style={{ fontWeight: 600 }}>
          Username:
          <input
            type="text"
            value={popupUsername}
            readOnly
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
              background: "#f5f5f5",
            }}
            required
          />
        </label>
        <label style={{ fontWeight: 600 }}>
          Role:
          <input
            type="text"
            value={popupRole}
            readOnly
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
              background: "#f5f5f5",
            }}
            required
          />
        </label>
        <label style={{ fontWeight: 600 }}>
          Weather Condition:
          <input
            type="text"
            value={popupCondition}
            onChange={(e) => setPopupCondition(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
            }}
            required
          />
        </label>
        <label style={{ fontWeight: 600 }}>
          Description:
          <textarea
            value={popupDescription}
            onChange={(e) => setPopupDescription(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              marginTop: 4,
              minHeight: 60,
            }}
            required
          />
        </label>
        {popupError && (
          <div style={{ color: "red", textAlign: "center" }}>{popupError}</div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={() => setShowPopup(false)}
            style={{
              background: "#eee",
              color: "#333",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "8px 18px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default PublishScenarioPopup;