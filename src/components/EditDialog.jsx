import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useEffect, useState } from "react";

import { useDataContext } from "../contexts/DataContext";

export const EditDialog = ({ transaction, open, setOpen }) => {
  const [currTransaction, setCurrTransaction] = useState({});

  const [openDeleteDialgo, setOpenDeleteDialgo] = useState(false);

  const { handleEditData, handleDelete } = useDataContext();

  useEffect(() => {
    setCurrTransaction({ ...transaction });
  }, [transaction]);

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await handleEditData(
        currTransaction.id,
        currTransaction.amount,
        currTransaction.dateTime,
        currTransaction.title,
        currTransaction.transactionType,
      );
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteTransaction = async () => {
    try {
      await handleDelete(currTransaction.id);
      setOpen(false);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        style={{ direction: "rtl" }}
      >
        <DialogTitle variant="h4" style={{ fontWeight: "bold" }}>
          تعديل دخل / منصرف
        </DialogTitle>
        <DialogContent>
          <form onSubmit={submitData} id="edit-form">
            {/*  */}
            <ToggleButtonGroup
              dir="ltr"
              color="primary"
              value={currTransaction.transactionType}
              exclusive
              onChange={(e) =>
                setCurrTransaction({
                  ...currTransaction,
                  transactionType: e.target.value,
                })
              }
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
              value={currTransaction.title}
              onChange={(e) =>
                setCurrTransaction({
                  ...currTransaction,
                  title: e.target.value,
                })
              }
            />
            <TextField
              required
              margin="dense"
              label="المبلغ"
              type="number"
              fullWidth
              variant="outlined"
              value={currTransaction.amount}
              onChange={(e) =>
                setCurrTransaction({
                  ...currTransaction,
                  amount: e.target.value,
                })
              }
            />
            <TextField
              required
              margin="dense"
              type="date"
              fullWidth
              variant="outlined"
              value={currTransaction.dateTime}
              onChange={(e) =>
                setCurrTransaction({
                  ...currTransaction,
                  dateTime: e.target.value,
                })
              }
            />
          </form>
        </DialogContent>
        <DialogActions style={{ gap: "10px" }}>
          <Button onClick={() => setOpen(false)}>إلغاء</Button>
          <Button
            variant="contained"
            style={{ background: "red" }}
            onClick={() => setOpenDeleteDialgo(true)}
          >
            حذف
          </Button>
          <Button
            type="submit"
            variant="contained"
            form="edit-form"
            style={{ marginLeft: "0px" }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialgo}
        onClose={() => setOpenDeleteDialgo(false)}
        style={{ direction: "rtl" }}
      >
        <DialogTitle variant="h6" style={{ fontWeight: "bold", color: "red" }}>
          هل أنت متأكد من حذف هذه العملية؟
        </DialogTitle>
        <DialogActions style={{ gap: "10px" }}>
          <Button onClick={() => setOpenDeleteDialgo(false)}>إلغاء</Button>
          <Button
            variant="contained"
            style={{ background: "red" }}
            onClick={handleDeleteTransaction}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
