
import { Lawsuit } from '../types';

export const lawsuits: Lawsuit[] = [
    {
        id: 'ms-l-v-ice',
        en: {
            name: 'Ms. L. v. ICE (Family Separation Lawsuit)',
            about: 'This lawsuit is about families who were separated by U.S. immigration officials at the border. The government separated thousands of parents from their children, causing immense trauma. The lawsuit argues that this practice was illegal and cruel, and it aims to reunite these families and provide support for the harm they suffered.',
            whoItHelps: 'This case helps parents and children who were apprehended by immigration authorities at the U.S.-Mexico border on or after July 1, 2017, and were separated from each other. This includes families who may have been recently separated or are still separated.',
            goal: 'The main goals are to: 1) Find and reunite all separated families. 2) Provide mental health support and medical care for these families. 3) Obtain a legal status (like asylum) for the families so they can stay together safely in the U.S. 4) Prevent the government from separating families like this in the future.',
            questions: [
                {
                    question: 'Were you separated from your child at the U.S. border after July 1, 2017?',
                    relevance: 'This is the main group of people (the "class") that the lawsuit is for. The date is important because it defines who is covered by the court’s orders.'
                },
                {
                    question: 'Was your child under 18 years old when you were separated?',
                    relevance: 'The lawsuit specifically focuses on the separation of parents from their minor children.'
                },
                {
                    question: 'Are you still looking for your child, or are you looking for your parent?',
                    relevance: 'The case provides resources to help locate and reunite families who are still separated.'
                }
            ],
            steps: [
                '**Do not sign any documents** you do not understand, especially if they are in English, without speaking to a lawyer.',
                '**Try to keep all your papers**, including any documents or forms that immigration officials gave you.',
                '**Contact a legal aid organization** immediately. They can help you for free. See the resources below.'
            ],
            documents: [
                'Any identification documents you have (for you and your child).',
                'Any papers given to you by immigration officials (Notices to Appear, booking forms, etc.).',
                'Birth certificates for your children.',
                'Any notes or contact information you have for people you met in detention.',
            ],
            resources: [
                {
                    name: 'ACLU Immigrants\' Rights Project',
                    phone: '(212) 549-2660',
                    website: 'https://www.aclu.org/other/ms-l-v-ice-resources-separated-families'
                },
                {
                    name: 'KIND (Kids in Need of Defense)',
                    phone: '(202) 824-8680',
                    website: 'https://supportkind.org'
                }
            ],
            deadlines: 'There is no specific deadline for you to join this lawsuit as it is a class action, but you should contact a lawyer as soon as possible to protect your rights.',
            privacy: 'Speaking with these legal organizations is safe and confidential. They are here to help you and will not share your information with ICE.'
        },
        es: {
            name: 'Ms. L. v. ICE (Demanda por Separación Familiar)',
            about: 'Esta demanda trata sobre las familias que fueron separadas por funcionarios de inmigración de EE. UU. en la frontera. El gobierno separó a miles de padres de sus hijos, causando un trauma inmenso. La demanda argumenta que esta práctica fue ilegal y cruel, y busca reunir a estas familias y ofrecer apoyo por el daño que sufrieron.',
            whoItHelps: 'Este caso ayuda a padres e hijos que fueron detenidos por las autoridades de inmigración en la frontera de EE. UU. y México el 1 de julio de 2017 o después, y que fueron separados. Esto incluye a familias que pueden haber sido separadas recientemente o que todavía lo están.',
            goal: 'Los objetivos principales son: 1) Encontrar y reunir a todas las familias separadas. 2) Proporcionar apoyo de salud mental y atención médica para estas familias. 3) Obtener un estatus legal (como asilo) para que las familias puedan permanecer juntas y seguras en EE. UU. 4) Evitar que el gobierno separe a familias de esta manera en el futuro.',
            questions: [
                {
                    question: '¿Fue separado/a de su hijo/a en la frontera de EE. UU. después del 1 de julio de 2017?',
                    relevance: 'Este es el grupo principal de personas (la "clase") para la que es la demanda. La fecha es importante porque define quién está cubierto por las órdenes del tribunal.'
                },
                {
                    question: '¿Tenía su hijo/a menos de 18 años cuando los separaron?',
                    relevance: 'La demanda se centra específicamente en la separación de padres de sus hijos menores de edad.'
                },
                {
                    question: '¿Todavía está buscando a su hijo/a, o está buscando a su padre/madre?',
                    relevance: 'El caso ofrece recursos para ayudar a localizar y reunir a las familias que siguen separadas.'
                }
            ],
            steps: [
                '**No firme ningún documento** que no entienda, especialmente si está en inglés, sin hablar con un abogado.',
                '**Trate de guardar todos sus papeles**, incluyendo cualquier documento o formulario que le hayan dado los funcionarios de inmigración.',
                '**Comuníquese con una organización de ayuda legal** de inmediato. Pueden ayudarle de forma gratuita. Vea los recursos a continuación.'
            ],
            documents: [
                'Cualquier documento de identificación que tenga (suyo y de su hijo/a).',
                'Cualquier papel que le hayan dado los funcionarios de inmigración (Notificaciones de Comparecencia, formularios de registro, etc.).',
                'Certificados de nacimiento de sus hijos.',
                'Cualquier nota o información de contacto que tenga de personas que conoció en detención.',
            ],
            resources: [
                {
                    name: 'Proyecto de Derechos de los Inmigrantes de la ACLU',
                    phone: '(212) 549-2660',
                    website: 'https://www.aclu.org/other/ms-l-v-ice-resources-separated-families'
                },
                {
                    name: 'KIND (Kids in Need of Defense)',
                    phone: '(202) 824-8680',
                    website: 'https://supportkind.org'
                }
            ],
            deadlines: 'No hay una fecha límite específica para unirse a esta demanda, ya que es una acción de clase, pero debe comunicarse con un abogado lo antes posible para proteger sus derechos.',
            privacy: 'Hablar con estas organizaciones legales es seguro y confidencial. Están aquí para ayudarle y no compartirán su información con ICE.'
        }
    },
    {
        id: 'fraihat-v-ice',
        en: {
            name: 'Fraihat v. ICE (Medical Care in Detention)',
            about: 'This lawsuit challenges the dangerously poor medical and mental health care provided in ICE detention facilities. It argues that ICE consistently fails to provide adequate care, leading to severe harm and even death. The lawsuit seeks to force ICE to fix these systemic problems.',
            whoItHelps: 'This case helps people who are currently or were formerly detained in an ICE facility and have a medical or mental health condition that was not properly treated. This includes people with disabilities, chronic illnesses, and serious mental health needs.',
            goal: 'The goal is to require ICE to provide all detained people with adequate medical evaluations, treatment, and accommodations for disabilities. It aims to create and enforce standards that protect the health and safety of everyone in ICE custody.',
            questions: [
                {
                    question: 'Are you (or were you) held in an ICE detention center?',
                    relevance: 'This lawsuit specifically covers people in the custody of U.S. Immigration and Customs Enforcement.'
                },
                {
                    question: 'Do you have a medical condition, mental health condition, or disability?',
                    relevance: 'The case focuses on the failure to provide adequate care for existing health issues.'
                },
                {
                    question: 'Did you request medical care or accommodation that was denied, delayed, or inadequate?',
                    relevance: 'Your experience of not receiving proper care is the central evidence for the case.'
                }
            ],
            steps: [
                '**Document everything.** Write down dates you requested medical help, who you spoke to, and what happened.',
                '**Keep medical records.** Save any paperwork, prescriptions, or notes related to your health.',
                '**Contact a legal group.** The organizations listed below are involved in this case and can offer guidance.'
            ],
            documents: [
                'Any medical records from before or during your detention.',
                'Copies of any medical requests or grievances you filed while in detention.',
                'Contact information for any witnesses who saw your condition or your attempts to get care.',
                'Release papers if you are no longer in detention.'
            ],
            resources: [
                {
                    name: 'Civil Rights Education and Enforcement Center (CREEC)',
                    phone: '(303) 757-7901',
                    website: 'https://creeclaw.org/case/fraihat-v-ice/'
                },
                {
                    name: 'Disability Rights Advocates (DRA)',
                    phone: '(212) 644-8644',
                    website: 'https://dralegal.org/'
                }
            ],
            deadlines: 'The case is ongoing. If you are experiencing these issues, you should contact a legal organization as soon as possible.',
            privacy: 'These legal organizations are independent of the government and are safe to contact. Your information will be kept confidential.'
        },
        es: {
            name: 'Fraihat v. ICE (Atención Médica en Detención)',
            about: 'Esta demanda desafía la peligrosamente deficiente atención médica y de salud mental proporcionada en los centros de detención de ICE. Sostiene que ICE falla consistentemente en proporcionar atención adecuada, lo que provoca daños graves e incluso la muerte. La demanda busca obligar a ICE a solucionar estos problemas sistémicos.',
            whoItHelps: 'Este caso ayuda a las personas que están o estuvieron detenidas en un centro de ICE y tienen una condición médica o de salud mental que no fue tratada adecuadamente. Esto incluye a personas con discapacidades, enfermedades crónicas y necesidades graves de salud mental.',
            goal: 'El objetivo es exigir que ICE proporcione a todas las personas detenidas evaluaciones médicas, tratamiento y adaptaciones adecuadas para discapacidades. Busca crear y hacer cumplir estándares que protejan la salud y la seguridad de todos los que están bajo custodia de ICE.',
            questions: [
                {
                    question: '¿Está (o estuvo) detenido/a en un centro de detención de ICE?',
                    relevance: 'Esta demanda cubre específicamente a las personas bajo la custodia del Servicio de Inmigración y Control de Aduanas de EE. UU.'
                },
                {
                    question: '¿Tiene una condición médica, una condición de salud mental o una discapacidad?',
                    relevance: 'El caso se centra en la falta de prestación de atención adecuada para problemas de salud existentes.'
                },
                {
                    question: '¿Solicitó atención médica o adaptaciones que fueron negadas, retrasadas o inadecuadas?',
                    relevance: 'Su experiencia de no recibir la atención adecuada es la evidencia central para el caso.'
                }
            ],
            steps: [
                '**Documente todo.** Anote las fechas en que solicitó ayuda médica, con quién habló y qué sucedió.',
                '**Guarde los registros médicos.** Conserve cualquier documento, receta o nota relacionada con su salud.',
                '**Comuníquese con un grupo legal.** Las organizaciones que se enumeran a continuación están involucradas en este caso y pueden ofrecer orientación.'
            ],
            documents: [
                'Cualquier registro médico de antes o durante su detención.',
                'Copias de cualquier solicitud médica o queja que haya presentado mientras estaba en detención.',
                'Información de contacto de cualquier testigo que haya visto su condición o sus intentos de obtener atención.',
                'Papeles de liberación si ya no está en detención.'
            ],
            resources: [
                {
                    name: 'Civil Rights Education and Enforcement Center (CREEC)',
                    phone: '(303) 757-7901',
                    website: 'https://creeclaw.org/case/fraihat-v-ice/'
                },
                {
                    name: 'Disability Rights Advocates (DRA)',
                    phone: '(212) 644-8644',
                    website: 'https://dralegal.org/'
                }
            ],
            deadlines: 'El caso está en curso. Si está experimentando estos problemas, debe comunicarse con una organización legal lo antes posible.',
            privacy: 'Estas organizaciones legales son independientes del gobierno y es seguro contactarlas. Su información se mantendrá confidencial.'
        }
    },
    {
        id: 'gonzalez-v-ice',
        en: {
            name: 'Gonzalez v. ICE (Bond Hearings)',
            about: 'This lawsuit argues that asylum seekers who are detained for long periods have a right to a bond hearing. It challenges the government\'s practice of holding people in detention for six months or more without giving them a chance to argue for their release before a judge.',
            whoItHelps: 'This case helps asylum seekers who have passed a credible fear interview (the first step in the asylum process) but have been held in detention for more than 6 months without getting a bond hearing.',
            goal: 'The goal is to ensure that every eligible asylum seeker gets a fair bond hearing before an immigration judge. In this hearing, the government must prove that the person is a flight risk or a danger to the community to justify their continued detention.',
            questions: [
                {
                    question: 'Are you an asylum seeker being held in ICE detention?',
                    relevance: 'This case specifically applies to people who are seeking asylum.'
                },
                {
                    question: 'Have you already passed your "credible fear" or "reasonable fear" interview?',
                    relevance: 'Passing this interview is a key requirement for the group of people this lawsuit helps.'
                },
                {
                    question: 'Have you been detained for more than six months?',
                    relevance: 'The lawsuit challenges prolonged detention, with six months being the key timeframe.'
                }
            ],
            steps: [
                '**Keep track of how long you have been detained.** The six-month mark is very important.',
                '**Request a bond hearing.** You or a legal representative should formally ask the immigration court for a bond hearing.',
                '**Contact an attorney or legal aid organization.** They can represent you at your hearing and argue for your release.'
            ],
            documents: [
                'Any documents related to your asylum claim.',
                'Proof of how long you have been in detention (e.g., booking forms).',
                'Letters of support from family or community members.',
                'Information about where you will live if you are released.'
            ],
            resources: [
                {
                    name: 'ACLU of Southern California',
                    phone: '(213) 977-5253',
                    website: 'https://www.aclusocal.org/'
                },
                {
                    name: 'National Immigrant Justice Center (NIJC)',
                    phone: '(312) 660-1370',
                    website: 'https://immigrantjustice.org/'
                }
            ],
            deadlines: 'You should request a bond hearing as soon as you are eligible (after six months of detention). Contact legal help immediately.',
            privacy: 'ACLU and NIJC are safe and confidential resources. They fight for the rights of immigrants.'
        },
        es: {
            name: 'Gonzalez v. ICE (Audiencias de Fianza)',
            about: 'Esta demanda argumenta que los solicitantes de asilo que están detenidos por largos períodos tienen derecho a una audiencia de fianza. Desafía la práctica del gobierno de mantener a las personas en detención durante seis meses o más sin darles la oportunidad de argumentar por su liberación ante un juez.',
            whoItHelps: 'Este caso ayuda a los solicitantes de asilo que han pasado una entrevista de miedo creíble (el primer paso en el proceso de asilo) pero han estado detenidos por más de 6 meses sin tener una audiencia de fianza.',
            goal: 'El objetivo es garantizar que cada solicitante de asilo elegible tenga una audiencia de fianza justa ante un juez de inmigración. En esta audiencia, el gobierno debe demostrar que la persona es un riesgo de fuga o un peligro para la comunidad para justificar su detención continua.',
            questions: [
                {
                    question: '¿Es usted un solicitante de asilo detenido en un centro de detención de ICE?',
                    relevance: 'Este caso se aplica específicamente a las personas que buscan asilo.'
                },
                {
                    question: '¿Ya pasó su entrevista de "miedo creíble" o "miedo razonable"?',
                    relevance: 'Pasar esta entrevista es un requisito clave para el grupo de personas que esta demanda ayuda.'
                },
                {
                    question: '¿Ha estado detenido/a por más de seis meses?',
                    relevance: 'La demanda desafía la detención prolongada, siendo seis meses el plazo clave.'
                }
            ],
            steps: [
                '**Lleve un registro de cuánto tiempo ha estado detenido.** La marca de los seis meses es muy importante.',
                '**Solicite una audiencia de fianza.** Usted o un representante legal deben solicitar formalmente al tribunal de inmigración una audiencia de fianza.',
                '**Comuníquese con un abogado o una organización de ayuda legal.** Pueden representarlo en su audiencia y argumentar a favor de su liberación.'
            ],
            documents: [
                'Cualquier documento relacionado con su solicitud de asilo.',
                'Prueba de cuánto tiempo ha estado en detención (por ejemplo, formularios de registro).',
                'Cartas de apoyo de familiares o miembros de la comunidad.',
                'Información sobre dónde vivirá si es liberado/a.'
            ],
            resources: [
                {
                    name: 'ACLU del Sur de California',
                    phone: '(213) 977-5253',
                    website: 'https://www.aclusocal.org/'
                },
                {
                    name: 'National Immigrant Justice Center (NIJC)',
                    phone: '(312) 660-1370',
                    website: 'https://immigrantjustice.org/'
                }
            ],
            deadlines: 'Debe solicitar una audiencia de fianza tan pronto como sea elegible (después de seis meses de detención). Contacte ayuda legal de inmediato.',
            privacy: 'La ACLU y el NIJC son recursos seguros y confidenciales. Luchan por los derechos de los inmigrantes.'
        }
    },
    {
        id: 'saravia-v-barr',
        en: {
            name: 'Saravia v. Barr (Youth Detention)',
            about: 'This lawsuit addresses the problem of immigrant youth who turn 18 while in the custody of the Office of Refugee Resettlement (ORR) and are then automatically transferred to adult ICE detention. The case argues that these young adults should be given individual consideration for release to less restrictive settings, like family members or shelters, instead of being sent to jail-like facilities.',
            whoItHelps: 'This helps young immigrants who entered the U.S. as unaccompanied minors, were placed in ORR custody, and were then transferred directly to an adult ICE detention facility on or around their 18th birthday.',
            goal: 'The goal is to stop the automatic transfer of these young adults to ICE detention and to ensure they receive a proper hearing to determine if they can be safely released to a less restrictive alternative.',
            questions: [
                {
                    question: 'Did you enter the United States as an unaccompanied child (under 18) and were you placed in an ORR shelter or facility?',
                    relevance: 'This case is specifically for youth who were in the unaccompanied children\'s program.'
                },
                {
                    question: 'When you turned 18, were you transferred directly from the ORR facility to an adult ICE detention center?',
                    relevance: 'The lawsuit focuses on this specific moment of transfer from youth custody to adult custody.'
                },
                {
                    question: 'Were you given a chance to argue for release to a family member or another community sponsor instead of being sent to ICE detention?',
                    relevance: 'The lack of this process is the central issue the lawsuit seeks to correct.'
                }
            ],
            steps: [
                '**If you are about to turn 18 in an ORR facility, tell your case worker and any attorney you have that you want to be released, not sent to ICE.**',
                '**Try to gather contact information for any family or friends in the U.S. who could sponsor you.**',
                '**Contact one of the legal organizations below immediately for help.**'
            ],
            documents: [
                'Any papers you received from ORR or ICE.',
                'Contact information for your case worker at the ORR facility.',
                'Contact information for family or potential sponsors in the U.S.',
                'Your birth certificate or any document showing your age.'
            ],
            resources: [
                {
                    name: 'ACLU of Northern California',
                    phone: '(415) 621-2493',
                    website: 'https://www.aclunc.org/'
                },
                {
                    name: 'National Center for Youth Law',
                    phone: '(510) 835-8098',
                    website: 'https://youthlaw.org/'
                }
            ],
            deadlines: 'This is most critical for youth who are approaching their 18th birthday in ORR custody. If you have already been transferred, you should still seek legal help immediately.',
            privacy: 'These legal organizations specialize in protecting the rights of immigrant youth and are a safe, confidential resource.'
        },
        es: {
            name: 'Saravia v. Barr (Detención de Jóvenes)',
            about: 'Esta demanda aborda el problema de los jóvenes inmigrantes que cumplen 18 años mientras están bajo la custodia de la Oficina de Reasentamiento de Refugiados (ORR) y luego son transferidos automáticamente a la detención de adultos de ICE. El caso argumenta que a estos jóvenes adultos se les debe dar una consideración individual para ser liberados a entornos menos restrictivos, como con familiares o en refugios, en lugar de ser enviados a instalaciones parecidas a una cárcel.',
            whoItHelps: 'Esto ayuda a los jóvenes inmigrantes que ingresaron a los EE. UU. como menores no acompañados, fueron puestos bajo custodia de la ORR y luego fueron transferidos directamente a un centro de detención de adultos de ICE al cumplir los 18 años o alrededor de esa fecha.',
            goal: 'El objetivo es detener la transferencia automática de estos jóvenes adultos a la detención de ICE y garantizar que reciban una audiencia adecuada para determinar si pueden ser liberados de manera segura a una alternativa menos restrictiva.',
            questions: [
                {
                    question: '¿Entró a los Estados Unidos como niño/a no acompañado/a (menor de 18 años) y fue puesto/a en un refugio o instalación de la ORR?',
                    relevance: 'Este caso es específicamente para jóvenes que estuvieron en el programa de niños no acompañados.'
                },
                {
                    question: 'Cuando cumplió 18 años, ¿fue transferido/a directamente de la instalación de la ORR a un centro de detención de adultos de ICE?',
                    relevance: 'La demanda se enfoca en este momento específico de la transferencia de la custodia juvenil a la custodia de adultos.'
                },
                {
                    question: '¿Se le dio la oportunidad de argumentar a favor de su liberación con un miembro de la familia u otro patrocinador comunitario en lugar de ser enviado/a a la detención de ICE?',
                    relevance: 'La falta de este proceso es el problema central que la demanda busca corregir.'
                }
            ],
            steps: [
                '**Si está a punto de cumplir 18 años en una instalación de la ORR, dígale a su trabajador social y a cualquier abogado que tenga que quiere ser liberado, no enviado a ICE.**',
                '**Intente reunir la información de contacto de cualquier familiar o amigo en los EE. UU. que pueda patrocinarlo.**',
                '**Comuníquese de inmediato con una de las organizaciones legales a continuación para obtener ayuda.**'
            ],
            documents: [
                'Cualquier papel que haya recibido de la ORR o de ICE.',
                'Información de contacto de su trabajador social en la instalación de la ORR.',
                'Información de contacto de familiares o posibles patrocinadores en los EE. UU.',
                'Su certificado de nacimiento o cualquier documento que muestre su edad.'
            ],
            resources: [
                {
                    name: 'ACLU del Norte de California',
                    phone: '(415) 621-2493',
                    website: 'https://www.aclunc.org/'
                },
                {
                    name: 'National Center for Youth Law',
                    phone: '(510) 835-8098',
                    website: 'https://youthlaw.org/'
                }
            ],
            deadlines: 'Esto es más crítico para los jóvenes que se acercan a su cumpleaños número 18 bajo la custodia de la ORR. Si ya ha sido transferido, debe buscar ayuda legal de inmediato.',
            privacy: 'Estas organizaciones legales se especializan en proteger los derechos de los jóvenes inmigrantes y son un recurso seguro y confidencial.'
        }
    }
];
