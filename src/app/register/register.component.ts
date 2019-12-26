import {Component} from '@angular/core';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent {
  /**
    registerForm: FormGroup;
    loading = false;
    submitted = false;
    error: string;

    constructor(private formBuilder: FormBuilder, private router: Router, private authenticationService: AuthenticationService, private userService: UserService) {
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        })
    }

    get f() {
        return this.registerForm.controls;
    }

    onSubmit() {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate(['/login'], {queryParams: { registered: true }});
                },
                error => {
                    this.error = error;
                    this.loading = false;
                }
            )
    }**/
}
