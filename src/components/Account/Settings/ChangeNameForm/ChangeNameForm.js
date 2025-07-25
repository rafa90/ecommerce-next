import {Form, from} from "semantic-ui-react"
import { useFormik} from "formik";
import {useAuth} from "@/hooks";
import {User} from "@/api";
import {initialValus, validationSchema} from "./ChangeNameForm.form";
import styles from "./ChangeNameForm.module.scss";

const userCtrl= new User();

export function ChangeNameForm() {
  const {user} = useAuth();
 // console.log(user);

  const formik = useFormik ({
    initialValues: initialValus(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async(formValue) =>{
      try{
        await userCtrl.updateMe(user.id, formValue);
      } catch(error){
        console.log("error");
      }
     },
  });


  return (
    <Form onSubmit={formik.handleSubmit}>
      <label>Nombre y apellidos</label>

      <div className={styles.content}>
        <Form.Input 
          name="firstname" 
          placeholder="Nombre" 
          value={formik.values.firstname} 
          onChange={formik.handleChange} 
          error={formik.errors.firstname}
        />
        <Form.Input 
          name="lastname" 
          placeholder="Apellidos" 
          value={formik.values.lastname} 
          onChange={formik.handleChange} 
          error={formik.errors.lastname}
        />
        <Form.Button type="submit" loading={formik.isSubmitting}>Enviar</Form.Button>
      </div>
    </Form>
  );
}
  