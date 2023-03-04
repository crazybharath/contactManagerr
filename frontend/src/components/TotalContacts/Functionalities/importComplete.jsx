import React from "react";
import { blue } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./importcompleted.css";

const ImportComplete = (props) => {
  return props.trigger2 ? (
    <React.Fragment>
      <div className="container-2">
        <section className="box-2">
          <CheckCircleIcon
            sx={{ fontSize: 40, color: blue[400] }}
            className="sucess"
          />
          <h4 className="text-head-2">Import Complete</h4>
          <h5 className="drop-2">CSV File is Uploaded</h5>
        </section>
      </div>
    </React.Fragment>
  ) : (
    ""
  );
};

export default ImportComplete;
