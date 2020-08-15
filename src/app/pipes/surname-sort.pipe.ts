import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'surnameSortPipe'
})
export class SurnameSortPipe implements PipeTransform {

  transform(items: any[],searchText:string,start:number,end:number,interviewer:boolean): any[] {
    if(!items){
      return [];
    }
    if(!searchText){
      return items.slice(start,end);
    }
    searchText = searchText.toLowerCase();
    return items.filter(item=>{
      if(interviewer){
        if(item && item.lastName){
          return item.lastName.toLowerCase().includes(searchText);
        }
      }else{
      if(item && item.user.lastName){
        return item.user.lastName.toLowerCase().includes(searchText);
      }
      return false;
      }
    });
  }

}
