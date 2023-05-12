import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

interface Coin {
  id: string
  name: string
  symbol: string
  image: string
  current_price: number
  price_change_percentage_24h: number
  total_volume: number
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  http: HttpClient;
  url: string = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false';
  coins: Coin[] = []
  filteredCoins: Coin[] = []
  filterName: string = ''
  columnTag: string[] = [
    '#',
    'Coin',
    'Price',
    'Price Change',
    '24h Volume'
  ]
  constructor(http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    this.http.get<Coin[]>(this.url)
      .subscribe(
        res => {
          this.filteredCoins = this.coins = res;
        },
        err => {
          console.log(err)
        }
      )
  }

  filterCoins(){
    this.filteredCoins = this.coins.filter(coin  => {
      const matchByName: boolean = coin.name.toLowerCase().includes(this.filterName.toLowerCase());
      const matchBySymbol: boolean = coin.symbol.toLowerCase().includes(this.filterName.toLowerCase())
      return matchByName || matchBySymbol;
    })
  }
}
