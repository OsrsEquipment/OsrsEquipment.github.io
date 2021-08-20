import Vue from 'vue';

let dialogRef;

function showMessage({ title, message }, err) {
  if (dialogRef) {
    dialogRef.open({ title, message });
  }
  console.error(err);
}

function setDialogRef(ref) {
  dialogRef = ref;
}

Vue.config.errorHandler = (err) => {
  showMessage({ title: 'Oops!', message: `Something bad happened: <br> ${err.message}` }, err);
};

window.addEventListener('error', (errorEvent) => {
  showMessage({ title: 'Oops!', message: `Something bad happened: <br> ${errorEvent.error.message}` }, errorEvent);
});

export default {
  setDialogRef,
};
