import { Pipe, PipeTransform } from '@angular/core';

import { PageService } from '../../services/page/page.service';

@Pipe({
  name: 'slugify',
  standalone: true,
})
export class SlugifyPipe implements PipeTransform {
  constructor(private readonly pageService: PageService) {}

  transform(value: string | number): string {
    return this.isString(value)
      ? value
          .toString()
          .toLowerCase()
          .trim()
          .replace(/[^\w-]+/g, ' ')
          .replace(/\s+/g, '-')
      : this.pageService.getTheActivePagesSlug();
  }

  isString(value: unknown): boolean {
    return typeof value === 'string';
  }
}
