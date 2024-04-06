import React from "react";
import Layout from "../../Layout/Layout";
import Image from 'next/image'
import { Typography } from "@material-ui/core";
function Datset() {
  return (
    <Layout>
    <Typography variant="h6" style={{margin:4,fontWeight:700}} >Dataset Used for Model Training</Typography>
    {/* <Typography variant="h6" style={{margin:4,fontWeight:700}} > The pictures are collected from different resources over the internet.</Typography> */}

      <div className="container">
        <div className="row">
          <div className="col-lg-3">
            <div className="card">
              <Image
                src="/labels/Chirag/1.jpeg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Chirag Kataria (Me)</h5>
                <p className="card-text">
                 Created This Project
                 (For Face Detection Analysis)
                </p>
                
              </div>
            </div>
          </div>
         
     
          <div className="col-lg-3">
            <div className="card">
              <Image
                 src="/labels/Vasu/1.jpeg"
                className="card-img-top"
                width="400"
                height="500"
                alt="criminal"
              />
              <div className="card-body">
                <h5 className="card-title">Vasu Mittal(Team Member)</h5>
                <p className="card-text">
                
                 Created This Project
                 (For Face Detection Analysis)
                </p>
                
              </div>
            </div>
          </div>
         
     
        
     
       
     
         
     
        </div>
      </div>
    </Layout>
  );
}

export default Datset;
