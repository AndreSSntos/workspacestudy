import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;

  constructor(private DadosService: DadosService) { }

  ngOnInit(): void {
    this.DadosService.obterdados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      }
    );
  }

  init(): void{
      if(typeof(google) !== 'undefined'){
        google.charts.load('current', {
          'packpages': ['corechart']
        });
        setTimeout(() => {
          google.charts.setOnLoadCallback(this.exibirGraficos()); 
        }, 1000) 
      }
  }

  exibirGraficos(): void{
    this.exibirPieChart();
    // this.exibir3dPieChart();
    // this.exibirBarChart();
    // this.exibirLineChart();
    // this.exibirColumnChart();
    // this.exibirDonutChart();

  }
  

  exibirPieChart(): void {
    const el = document.getElementById('pie_chart');
    const chart = new google.visualization.PieChart(el);

    chart.draw(this.obterDataTable(), this.obterOpcoes()); 
  }
  // exibir3dPieChart(): void{
  //   const el = document.getElementById('3d_pie_chart');
  //   const chart = new google.visualization.PieChart(el);

  //   chart.draw(this.obterDataTable(), this.obterOpcoes()); 
  // }

  obterDataTable(): any{
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Mês');
    data.addColumn('number', 'Quantidade');
    data.addRows(this.dados);
    return data;
  }

  obterOpcoes(): any{
    return{
      'title': 'Quantidade de cadastros primeiro semestre',
      'width': 400,
      'height': 300
    };
  } 
  

}
