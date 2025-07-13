import AddForm from "@/components/add/add-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"



const AddItem = () => {
  return (
    <main className="max-w-4xl mx-auto mt-20">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-gray-500">
            Add Found Item
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AddForm />
        </CardContent>
      </Card>
    </main>
  )
}

export default AddItem