import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { LinkInfo } from "./LinkInfo";
import { AddFilesForm } from "./AddFilesForm";
import Card from "@material-ui/core/Card";

type InitialValues = {
  // requesterEmail: string;
  // requesterName: string;
  // requesterAddress: string;
  // token: string;
  // amount?: number;
  title: string;
  message: string;
  memo?: string;
  due?: number | null;
  afterSubmit?: string;
};

export const AddFiles = () => {
  const [link, setLink] = useState<string | null>(null);
  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("File title is required"),
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      title: "",
      message: "",
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        console.log("salut");
        console.log({
          ...values,
          // due: values.due ? new Date(values.due).toISOString() : null
        });
        const id = Math.floor(Math.random() * 10);
        // ===========================================================
        // UPLOAD TO WEB3 STORAGE ===========================================================
        // ===========================================================
        setLink(id.toString());
      } catch (error) {
        console.error(error);
        resetForm();
      }
    },
  });

  const reset = () => {
    formik.resetForm();
    setLink(null);
  };
  return (
    <Card>
      {link ? (
        <LinkInfo id={link} reset={reset} />
      ) : (
        <AddFilesForm formik={formik} />
      )}
    </Card>
  );
};
