export interface routeGroup {
    case_name: string,
    group_name: string,
    route: string,
    role: string,
    children: routeGroup[]
}