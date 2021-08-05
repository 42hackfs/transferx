import React from "react";
import { useState, useRef } from "react";
import { Form, FormikProvider } from "formik";
import { Button, Container } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import { TextField } from "@material-ui/core";

export const AddFilesForm = ({ formik }: { formik: any }) => {
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
    formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        {/* <Stack sx={{ padding: 4 }} spacing={3}> */}
        <Container>
          <Typography variant="h6">Add your files</Typography>
          {/* 
          {errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit}</Alert>
          )} */}
          <TextField
            fullWidth
            type="text"
            label="Message"
            {...getFieldProps("message")}
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
          />

          <Button type="submit">Get a link</Button>
          {/* </Stack> */}
        </Container>
      </Form>
    </FormikProvider>
  );
};
