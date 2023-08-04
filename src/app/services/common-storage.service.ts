import { Injectable } from '@angular/core';
import { reportData } from '../modals/report-data.model';

const CURRENT_POPULATION = 'currentPopulation';
const MAIN_ROUTE = 'mainRoute';
const MAIN_ROUTE_NAME = 'mainRoute';
const WIDGET_REPORT = 'widgetReport';
const SELECTED_GATE = 'selected_gate';



@Injectable({
    providedIn: 'root'
})
export class CommonStorageService {

    constructor() { }

    public saveCurrentPopulation(currentPopulation: string): void {
        window.sessionStorage.removeItem(CURRENT_POPULATION);
        window.sessionStorage.setItem(CURRENT_POPULATION, currentPopulation);
    }

    public getCurrentPopulation(): string | null {
        return window.sessionStorage.getItem(CURRENT_POPULATION);
    }

    public saveMainRoute(currentPopulation: string): void {
        window.sessionStorage.removeItem(MAIN_ROUTE);
        window.sessionStorage.setItem(MAIN_ROUTE, currentPopulation);
    }

    public getMainRoute(): string | null {
        return window.sessionStorage.getItem(MAIN_ROUTE);
    }

    public saveMainRouteName(currentPopulation: string): void {
        window.sessionStorage.removeItem(MAIN_ROUTE_NAME);
        window.sessionStorage.setItem(MAIN_ROUTE_NAME, currentPopulation);
    }

    public saveSelectedGate(gate: string): void {
        window.sessionStorage.removeItem(SELECTED_GATE);
        window.sessionStorage.setItem(SELECTED_GATE, gate);
    }

    public getSelectedGate(): string | null {
        return window.sessionStorage.getItem(SELECTED_GATE);
    }
    public removeSelectedGate(): void {
        window.sessionStorage.removeItem(SELECTED_GATE);
    }

    public getMainRouteName(): string | null {
        return window.sessionStorage.getItem(MAIN_ROUTE_NAME);
    }

    public addWidgetToReport(widget: reportData): void {
        var data: Array<reportData> | undefined;
        data = this.getWidgetReportData();
        if (data) {
            data.push(widget);
        } else {
            data = [widget]
        }

        const jsonString = JSON.stringify(data);
        window.sessionStorage.setItem(WIDGET_REPORT, jsonString);
    }

    public removeWidgetFromReport(widget: reportData): void {
        var data: Array<reportData> | undefined;
        data = this.getWidgetReportData();
        if (data)
            for (let index = 0; index < data.length; index++) {
                const element = data[index];


                if (element.chart_name === widget.chart_name) {
                    data.splice(index, 1);
                }
            };
        const jsonString = JSON.stringify(data);
        window.sessionStorage.setItem(WIDGET_REPORT, jsonString);
    }

    public getWidgetReportData(): Array<reportData> | undefined {
        const jsonString = sessionStorage.getItem(WIDGET_REPORT);

        if (jsonString != undefined && jsonString != "undefined") {

            const widgetArray = JSON.parse(jsonString);
            return widgetArray;
        } else {
            return undefined;
        }


    }

    public removeAllWidgetReportData(): void {
        window.sessionStorage.removeItem(WIDGET_REPORT);

    }

}