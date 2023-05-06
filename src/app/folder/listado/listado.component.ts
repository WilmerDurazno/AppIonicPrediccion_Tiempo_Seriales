import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { exaCliente, Cliente} from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss'],
})


export class ListadoComponent  implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);

  edadesMediasPorNacionalidad: { [nacionalidad: string]: number } = {};

  edades: number[] = [];
  Exaclientes: exaCliente[]=[];



  newcliente: exaCliente = {
    id: this.firestoreService.getId(),
    nombres: '',
    apellidos: '',
    edad: '',
    genero: '',
    educacion:'',
    nacionalidad:'',
    telefono:'',
    fecha: new Date(),
    email: '',
    password: '',
    tiempo:'',
  };

 
  private path = 'Clientes/';

  constructor(public firestoreService: FirestoreService,public firestore: AngularFirestore) {
    this.getEdades();
   }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.getCliente();
    
  }
  getCliente(){
    this.firestoreService.getCollection<exaCliente>(this.path).subscribe( res =>{
      this.Exaclientes = res;
    });  
  }
  deletecliente(cliente: exaCliente){
    this.firestoreService.deletDoc(this.path,cliente.id)
  }

  calcularMedia(numeros: number[]): number {
    if (numeros.length === 0) {
      return 0;
    }
  
    const suma = numeros.reduce((a, b) => a + b, 0);
    const media = suma / numeros.length;
    return media;
  }

  getNacionalidades(clientes: Cliente[]): string[] {
    const nacionalidadesSet = new Set<string>();
    clientes.forEach(cliente => {
      if (cliente.nacionalidad) {
        nacionalidadesSet.add(cliente.nacionalidad);
      }
    });
    return Array.from(nacionalidadesSet);
  }

  
  async getEdades() {
    console.log("hla")
    const snapshot = await this.firestore.collection(this.path).get().toPromise() as firebase.firestore.QuerySnapshot<Cliente>;
    const clientesPorNacionalidad: { [nacionalidad: string]: Cliente[] } = {};
  
    snapshot.forEach(doc => {
      const data = doc.data() as Cliente;
      if (data.edad && data.nacionalidad) {
        if (!clientesPorNacionalidad[data.nacionalidad]) {
          clientesPorNacionalidad[data.nacionalidad] = [];
        }
        clientesPorNacionalidad[data.nacionalidad].push(data);
      }
    });
  
    for (const nacionalidad in clientesPorNacionalidad) {
      const edades: number[] = clientesPorNacionalidad[nacionalidad].map(cliente => Number(cliente.edad));
      this.edadesMediasPorNacionalidad[nacionalidad] = this.calcularMedia(edades);
    }
  
    console.log('Edad media de los clientes por nacionalidad:', this.edadesMediasPorNacionalidad);
  }
  getNacionalidadesKeys(): string[] {
    return Object.keys(this.edadesMediasPorNacionalidad);
  }
  
}
