import { Router } from "express";

export default interface RouterInterface {
    path: string;
    router: Router;
}