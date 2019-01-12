export const SAVE_REQUEST_FORM_DATA = "SAVE_REQUEST_FORM_DATA";
export const RESET_REQUEST_FORM_DATA = "RESET_REQUEST_FORM_DATA";

export function saveRequestFormData(data) {
  return {type: SAVE_REQUEST_FORM_DATA, payload: data};
};

export function requestRequestFormData() {
  return {type: RESET_REQUEST_FORM_DATA};
};