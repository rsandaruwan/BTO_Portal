export interface routeNavGroupInterface {
    case_name: string,
    group_name: string,
    route: string,
    role: string,
    children: routeNavGroupInterface[],
    navigation: boolean
}