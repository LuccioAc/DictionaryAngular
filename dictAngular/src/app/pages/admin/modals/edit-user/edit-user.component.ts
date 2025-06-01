import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styles: ``
})
export class EditUserComponent {
  @Input() user: any = null;
  @Output() close = new EventEmitter<void>();
  
  editUserForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.editUserForm = this.fb.group({
      nameusr: ['', Validators.required],
      passw: ['', [Validators.minLength(6)]], // Solo una verificación mínima para la contraseña
      rol: [false, Validators.required]
    });
  }

  ngOnChanges() {
    if (this.user) {
      // Si el usuario es proporcionado, lo usamos para inicializar el formulario
      this.editUserForm.patchValue({
        nameusr: this.user.nameusr,
        passw: '',
        rol: this.user.rol
      });
    }
  }

  onSubmit() {
  if (this.editUserForm.valid && this.user) {
    const updatedUser = { 
      ...this.user, 
      ...this.editUserForm.value 
    };

    // Si la contraseña está vacía, no la incluimos en el objeto a enviar
    if (!updatedUser.passw) {
      delete updatedUser.passw;
    }

    console.log("Datos enviados al backend:", updatedUser);  // Verifica los datos

    this.userService.updateUser(updatedUser).subscribe({
      next: () => {
        alert('Usuario actualizado exitosamente');
        this.close.emit();  // Emitir el evento para cerrar el modal
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);  // Detalles del error
        alert('Error al actualizar el usuario');
      }
    });
  }
}

}
