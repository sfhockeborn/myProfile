import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from '@angular/core';
import {Location} from '@angular/common';

import {Observable} from "rxjs/Observable";

import {HelpersService} from "../../helpers/helpers.service";
import {Option22Service} from "../../helpers/option22.service";

@Injectable()
export class GoalsFormPageResolverService implements Resolve<any> {

    constructor(private helpersService: HelpersService, private http: Option22Service) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve) => {
            if (route.params['id'] === 'new') {
                resolve(null);
                return;
            }
            this.helpersService.getAuthUri().then((url) => {
                if (url) {
                    this.http.get(Location.joinWithSlash(url, `goals/${route.params['id']}`)).toPromise().then((response) => {
                        resolve(response.json());
                    });
                } else {
                    resolve(null);
                }
            });
        });
    }
}
