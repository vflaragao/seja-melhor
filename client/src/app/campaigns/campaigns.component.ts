import { Component, OnInit } from '@angular/core';
import { CampaignGetDTO, ActionCategory } from '@models/campaign';
import { ProductType, ProductTypeStatistics } from '@models/product';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  private campaign: CampaignGetDTO;

  private typeStats: ProductTypeStatistics[];

  constructor() {
    this.campaign = {
      title: 'Julho beneficente em prol da APIPA',
      description: 'Durante todo o mês de JULHO a @gabbsfarias vai estar com essa campanha linda para arrecadar ração pra nosso abrigo! Você que curte tattoo não vai perder essa',
      creator: {
        name: 'APIPA - ASSOCIAÇÃO PIAUIENSE DE PROTEÇÃO E AMOR AOS ANIMAIS',
        facebook: 'https://www.facebook.com/apipa.piaui/?ref=br_rs',
        instagram: 'https://www.instagram.com/apipaoficial/',
        site: 'https://www.apipapiaui.org/'
      },
      category: ActionCategory.ANIMALS,
      ttl: 15,
      expiresAt: new Date(),
      types: [ProductType.FOOD, ProductType.REMEDY]
    }
    this.typeStats = this.campaign.types.map(type => ({
      type, progress: 50
    }))
  }

  ngOnInit() {
  }

  get containsSite() {
    return this.campaign.creator.site;
  }

  get containsSocialMedia() {
    const { facebook, instagram, twitter } = this.campaign.creator;
    return facebook || instagram || twitter;
  }

  open(url: string) {
    window.open(url, '_blank');
  }

}
