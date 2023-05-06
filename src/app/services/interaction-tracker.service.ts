import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class InteractionTrackerService {
  private registrationStartTime: number | null = null;
  calculateElapsedTime: any;

  constructor(private firestore: AngularFirestore) { }
  setRegistrationStartTime(time: number): void {
    this.registrationStartTime = time;
  }

  getRegistrationStartTime(): number | null {
    return this.registrationStartTime;
  }
  async saveInteractionTime(userId: string, timeSpent: number, docId?: string): Promise<string | undefined> {
    try {
      if (docId) {
        await this.firestore.collection('interactionTimes').doc(docId).update({
          timeSpent,
          timestamp: Date.now(),
        });
        console.log('Tiempo de interacción actualizado en Firestore.');
      } else {
        const docRef = await this.firestore.collection('interactionTimes').add({
          userId,
          timeSpent,
          timestamp: Date.now(),
        });
        console.log('Tiempo de interacción guardado en Firestore.' );
        return docRef.id;
      }
    } catch (error) {
      console.error('Error al guardar o actualizar el tiempo de interacción en Firestore:', error);
    }
    return undefined;
  }
  
}
