export function extractLocalStorageStoreExists(): boolean {
  return localStorage.getItem("persist:root") !== null;
}
