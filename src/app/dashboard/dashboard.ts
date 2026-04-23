import { Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';

import { heroFunnel } from '@ng-icons/heroicons/outline';
import { heroAdjustmentsHorizontalMicro } from '@ng-icons/heroicons/micro';

import { Button } from "../button/button";
import { Filter } from '../filter/filter';

@Component({
  selector: 'app-dashboard',
  imports: [NgIconComponent, Button, Filter],
  viewProviders: [provideIcons({ heroFunnel, heroAdjustmentsHorizontalMicro })],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  isFilterModalOpen: boolean = false;

  appliedFiltersCount: number = 0;

  toggleFilterModal() {
    this.isFilterModalOpen = !this.isFilterModalOpen;
  }

  onFiltersApplied(count: number) {
    this.appliedFiltersCount = count;
    this.isFilterModalOpen = false;
  }
}
