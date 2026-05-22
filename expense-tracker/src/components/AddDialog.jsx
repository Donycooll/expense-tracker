import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

import { useDataContext } from "../contexts/DataContext";

export const AddDialog = ({ open, setOpen }) => {
  const { handleAddData } = useDataContext();

  const [transactionAmount, setTransactionAmount] = useState("");
  const [transactionDateTime, setTransactionDateTime] = useState("");
  const [transactionTitle, setTransactionTitle] = useState("");
  const [transactionType, setTransactionType] = useState("دخل");

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await handleAddData(
        transactionAmount,
        transactionDateTime,
        transactionTitle,
        transactionType,
      );
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      style={{ direction: "rtl" }}
    >
      <DialogTitle variant="h4" style={{ fontWeight: "bold" }}>
        إضافة دخل / منصرف
      </DialogTitle>
      <DialogContent>
        <form onSubmit={submitData} id="subscription-form">
          {/*  */}
          <ToggleButtonGroup
            dir="ltr"
            color="primary"
            value={transactionType}
            exclusive
            onChange={(e) => setTransactionType(e.target.value)}
            aria-label="Platform"
            fullWidth
          >
            <ToggleButton value="منصرف">منصرف</ToggleButton>
            <ToggleButton value="دخل">دخل</ToggleButton>
          </ToggleButtonGroup>
          {/*  */}
          <TextField
            required
            margin="dense"
            label="وصف العملية"
            type="text"
            fullWidth
            variant="outlined"
            onChange={(e) => setTransactionTitle(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            label="المبلغ"
            type="number"
            fullWidth
            variant="outlined"
            onChange={(e) => setTransactionAmount(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            type="date"
            fullWidth
            variant="outlined"
            onChange={(e) => setTransactionDateTime(e.target.value)}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>إلغاء</Button>
        <Button type="submit" variant="contained" form="subscription-form">
          إضافة
        </Button>
      </DialogActions>
    </Dialog>
  );
};
