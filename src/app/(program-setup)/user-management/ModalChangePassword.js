import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Checkbox,
  CheckboxGroup,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { toastSuccess } from "@/components/ToastAlert";

export default function ModalChangePassword({ isOpen, size, onClose }) {
  const initialValues = {
    new_password: "",
    conf_password: "",
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        backdrop="blur"
        classNames={{
          body: "py-6",
          header: "border-b-[4px] border-primary",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Change Password
              </ModalHeader>
              <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                  new_password: Yup.string().min(
                    8,
                    "Must be at least 8 characters"
                  ),
                })}
                onSubmit={async (values) => {
                  // Consider removing the setTimeout for testing purposes
                  await new Promise((r) => setTimeout(r, 500));
                  toastSuccess({
                    title: "Password Changed Successfully",
                  });
                  onClose();
                }}
              >
                {(props) => (
                  <Form>
                    <ModalBody>
                      <div>
                        <Input
                          isRequired
                          size="sm"
                          label="New Password"
                          name="new_password"
                          variant="bordered"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.touched.new_password &&
                        props.errors.new_password ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.new_password}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Input
                          isRequired
                          size="sm"
                          label="Confirm Password"
                          name="conf_password"
                          variant="bordered"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                        />
                        {props.touched.conf_password &&
                        props.errors.conf_password ? (
                          <div className="text-sm text-primary font-semibold">
                            {props.errors.conf_password}
                          </div>
                        ) : null}
                      </div>
                    </ModalBody>

                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Cancel
                      </Button>

                      <Button color="primary" type="submit">
                        Save
                      </Button>
                    </ModalFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
