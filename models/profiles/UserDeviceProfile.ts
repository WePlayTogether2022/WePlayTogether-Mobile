import { Device } from "../resources/Device";

export interface UserDeviceProfile {
  id: number;
  loginCount: number;
  isCurrentDevice: boolean;
  device: Device;
}
