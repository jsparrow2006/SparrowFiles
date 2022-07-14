import Platforms  from "@services/typeOSService/types/Platforms";

export default interface IPlatformMatches<T> {
    [Platforms.MAC]: T;
    [Platforms.WINDOWS]: T;
    [Platforms.LINUX]: T;
}
