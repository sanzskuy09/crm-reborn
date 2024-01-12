"use client";
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalContent,
  ModalFooter,
  Button,
  Spinner,
  Input,
} from "@nextui-org/react";
import { API } from "@/API/api";
import { SetColorStatus } from "@/utils";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalStatusProductProfile = ({
  isOpen,
  onOpenChange,
  onClose,
  id,
  onSuccess,
}) => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching product data...");
        const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/edit?id=${id}`;
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        });
        const result = await response.json();

        console.log("API Response:", result);

        if (result.result && result.result.items.length > 0) {
          const product = result.result.items[0];
          setProductData({
            ...product,
            status: SetColorStatus(product.status),
          });
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);

  const handleStatusChange = async (status) => {
    try {
      setLoading(true);
      const apiUrl = `http://10.21.9.212:1945/crmreborn/pp/actionStatus`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          // status: status === "APPROVED" ? 0 : 2,
          action: status === "APPROVED" ? "APPROVED" : "REJECTED",
        }),
      });
      const result = await response.json();

      console.log("Status Update Response:", result);
      if (status === "APPROVED") {
        // Notify success for APPROVED
        toast.success("Product has been approved successfully!");
      } else if (status === "REJECTED") {
        // Notify success for REJECTED
        toast.info("Product has been rejected.");
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1 text-center">
            Update Status
          </ModalHeader>
          <ModalBody>
            {productData ? (
              <div className="w-full grid grid-cols-12 gap-4">
                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    type="number"
                    label="ID"
                    name="product_code"
                    variant="bordered"
                    value={productData.id}
                  />
                </div>
                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    type="number"
                    label="Product Code"
                    name="product_code"
                    variant="bordered"
                    value={productData.product_code}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="Product Desc"
                    name="product_desc"
                    variant="bordered"
                    value={productData.product_desc}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    label="Face Value"
                    name="face_value"
                    variant="bordered"
                    value={productData.face_value}
                  />
                </div>

                <div className="col-span-6 cursor-not-allowed">
                  <Input
                    isReadOnly
                    size="sm"
                    type="number"
                    label="Card Fee"
                    name="card_fee"
                    variant="bordered"
                    placeholder="1"
                    value={productData.card_fee}
                  />
                </div>
              </div>
            ) : (
              <Spinner />
            )}
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => handleStatusChange("APPROVED")}
              disabled={loading}
            >
              {loading ? "Approving..." : "Approve"}
            </Button>
            <Button
              color="primary"
              onClick={() => handleStatusChange("REJECTED")}
              disabled={loading}
            >
              {loading ? "Rejecting..." : "Reject"}
            </Button>
            <Button auto onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalStatusProductProfile;
